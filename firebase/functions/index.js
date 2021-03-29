const { https, config, firestore, logger } = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp({
  storageBucket: 'feryardiant-id.appspot.com'
})

const express = require('express')
const app = express()

const db = admin.firestore()
const bucket = admin.storage().bucket()
const conf = config()

const parseInboundMail = require('./mail')

const attachments = db.collection('attachments')
const conversations = db.collection('conversations')
const people = db.collection('people')

exports.mail = https.onRequest(parseInboundMail(app, db, logger, bucket))

exports.autoReply = firestore.document('messages/{messageId}').onCreate(async (snap, { params }) => {
  const envelope = snap.data()
  const conversation = conversations.doc(envelope.topic || envelope.subject)
  const messages = conversation.collection('messages')
  const participants = conversation.collection('participants')

  const batch = db.batch()
  await people.doc(envelope.from.address).set(envelope.from)
  await messages.doc(params.messageId).set(envelope)
  await participants.doc(envelope.from.address).set(envelope.from)

  for (const party of ['to', 'cc']) {
    if (!envelope[party]) continue

    for (const participant of envelope[party]) {
      await participants.doc(participant.address).set(participant)
    }
  }

  const messageAttachments = snap.get('attachments')

  if (messageAttachments) {
    for (const attachment of messageAttachments) {
      attachments.doc(attachment.cid).set(attachment)
    }
  }

  await batch.commit()

  // const message = await conversation.get()
  // const mail = message.data()
  // const mails = []

  // if (!mail.replied) {
  //   mails.push({
  //     to: mail.from,
  //     from: mail.to[0],
  //     replyTo: mail.to[0],
  //     headers: headers,
  //     subject: `Re: ${params.subject}`,
  //     text: 'Hi there,\n\nThank you for reaching me out and this is auto-reply email, will be back to you ASAP.\n\nBest regards\nFery W.'
  //   })
  // }

  // const toMe = {
  //   to: conf.app.author.email,
  //   from: {
  //     name: mail.from.name,
  //     email: mail.to[0].email
  //   },
  //   replyTo: mail.from,
  //   headers,
  //   subject: params.subject,
  //   text: content['text/plain']
  // }

  // if (content['text/html']?.length) {
  //   toMe.html = content['text/html']
  // }

  // mails.push(toMe)
  // logger.log(mails)

  // try {
  //   sg.setApiKey(conf.sendgrid.key)
  //   await sg.send(mails)

  //   if (!mail.replied) {
  //     await messageRef.update({
  //       replied: true
  //     })
  //   }
  // } catch (err) {
  //   logger.error(err)
  // }
})
