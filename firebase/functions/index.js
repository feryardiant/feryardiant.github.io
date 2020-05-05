const { https, config, firestore } = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const { parseMail } = require('./lib')
const db = admin.firestore()
const conf = config()

const sg = require('@sendgrid/mail')

const contacts = db.collection('contacts')
const messages = db.collection('messages')

exports.autoReply = firestore
  .document('messages/{subject}/contents/{content}')
  .onCreate(async (snap, { params }) => {
    const replyEmail = conf.app.mail
    const headers = {
      'In-Reply-To': params.content
    }

    const messageRef = messages.doc(params.subject)
    const message = await messageRef.get()
    const content = snap.data()
    const mail = message.data()
    const mails = []

    if (!mail.replied) {
      mails.push({
        to: mail.from,
        from: mail.to[0],
        replyTo: mail.to[0],
        headers: headers,
        subject: `Re: ${params.subject}`,
        text:
          'Hi there,\n\nThank you for reaching me out and this is auto-reply email, will be back to you ASAP.\n\nBest regards\nFery W.'
      })
    }

    const toMe = {
      to: conf.app.author.email,
      from: {
        name: mail.from.name,
        email: mail.to[0].email
      },
      replyTo: mail.from,
      headers: headers,
      subject: params.subject,
      text: content['text/plain']
    }

    if (content['text/html'].length) {
      toMe.html = content['text/html']
    }

    mails.push(toMe)
    console.log(mails)

    try {
      sg.setApiKey(conf.sendgrid.key)
      await sg.send(mails)

      if (!mail.replied) {
        await messageRef.update({
          replied: true
        })
      }
    } catch (err) {
      console.error(err.toString())
    }
  })

exports.mail = https.onRequest(async (req, res) => {
  if (req.method.toLowerCase() !== 'post') {
    return res.status(403).send('Error')
  }

  const mail = parseMail(req)

  try {
    await db.runTransaction(async (trans) => {
      const sender = contacts.doc(mail.from.email)
      await sender.set(mail.from)

      const message = messages.doc(mail.subject)
      const email = await trans.get(message)

      if (!email.exists) {
        await trans.set(message, {
          from: mail.from,
          to: mail.to,
          replied: false
        })
      }

      const envelope = {}
      for (const content of mail.contents) {
        envelope[content.content_type.split(';')[0]] = content.decoded || ''
      }

      await trans.set(
        message.collection('contents').doc(mail.message_id),
        envelope
      )
    })
  } catch (err) {
    console.error('Transaction error:', err)
  }

  return res.send('Ok')
})
