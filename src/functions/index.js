const { https, config, firestore } = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const { parseMail } = require('./lib')
const db = admin.firestore()
const conf = config()

const sg = require('@sendgrid/mail')

const contacts = db.collection('contacts')
const messages = db.collection('messages')

exports.autoReply = firestore.document('messages/{messageId}').onCreate(async (snap, { params }) => {
  if (!conf.sendgrid) {
    return
  }

  const mail = snap.data()
  const replyEmail = 'noreply@feryardiant.id'

  const subject = mail.subject.startsWith('Re: ') ? mail.subject.slice(4) : mail.subject
  const headers = {
    'In-Reply-To': params.messageId
  }

  const reply = [
    {
      to: mail.from,
      from: {
        name: 'Fery Wardiyanto (auto-reply)',
        email: replyEmail
      },
      replyTo: mail.to,
      headers: headers,
      subject: `Re: ${subject}`,
      text: 'Hi there,\n\nThank you for reaching me out and this is auto-reply email, will be back to you ASAP.\n\nBest regards\nFery W.'
    },
    {
      to: 'ferywardiyanto@gmail.com',
      from: {
        name: 'Fery Wardiyanto (auto-reply)',
        email: replyEmail
      },
      replyTo: mail.from,
      headers: headers,
      subject: subject,
      text: mail.content.text,
      html: mail.content.html
    }
  ]

  try {
    sg.setApiKey(conf.sendgrid.key)
    await sg.send(reply)

    console.info('Auto-reply sent', {
      from: mail.to,
      to: mail.from
    })
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

      const message = contacts.doc(mail.message_id)
      const email = await trans.get(message)

      if (!email.exists) {
        await trans.set(message, {
          from: mail.from,
          to: mail.to,
          subject: mail.subject,
          content: mail.content,
          folder: 'inbox',
          replied: false
        })
      }
    })
  } catch (err) {
    console.error('Transaction error:', err)
  }

  return res.send('Ok')
})
