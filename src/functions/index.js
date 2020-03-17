const { https, config, firestore } = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const { parseMail } = require('./lib')
const db = admin.firestore()
const conf = config()

const sg = require('@sendgrid/mail')

const contacts = db.collection('contacts')
const messages = db.collection('messages')

exports.autoReply = firestore.document('messages/{subject}/contents/{content}').onCreate(async (snap, { params }) => {
  if (!conf.sendgrid) {
    return
  }

  const replyEmail = 'noreply@feryardiant.id'
  const headers = {
    'In-Reply-To': params.content
  }

  try {
    const messageRef = messages.doc(params.subject)
    const message = await messageRef.get()
    const content = snap.data()
    const mail = message.data()

    const reply = [
      {
        to: 'ferywardiyanto@gmail.com',
        from: {
          name: 'Fery Wardiyanto (auto-reply)',
          email: replyEmail
        },
        replyTo: mail.from,
        headers: headers,
        subject: params.subject,
        text: content.text,
        html: content.html
      }
    ]

    if (!mail.replied) {
      reply.push({
        to: mail.from,
        from: {
          name: 'Fery Wardiyanto (auto-reply)',
          email: replyEmail
        },
        replyTo: mail.to,
        headers: headers,
        subject: `Re: ${params.subject}`,
        text: 'Hi there,\n\nThank you for reaching me out and this is auto-reply email, will be back to you ASAP.\n\nBest regards\nFery W.'
      })
    }

    sg.setApiKey(conf.sendgrid.key)
    await sg.send(reply)

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

  const mail = parseMail(req.body, req.headers)

  try {
    await db.runTransaction(async trans => {
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

      await trans.set(message.collection('contents').doc(mail.message_id), mail.content)
    })
  } catch (err) {
    console.error('Transaction error:', err)
  }

  return res.send('Ok')
})
