const { https, config, firestore } = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const { parseMail } = require('./lib')
const db = admin.firestore()
const conf = config()

const sg = require('@sendgrid/mail')

const contacts = db.collection('contacts')
const messages = db.collection('messages')

exports.autoReply = firestore.document('messages/{subject}').onWrite(async (change, { params }) => {
  if (!conf.sendgrid) {
    return
  }

  const replyEmail = 'noreply@feryardiant.id'
  const headers = {
    'In-Reply-To': params.messageId
  }

  try {
    const message = messages.doc(params.subject)
    const envelope = await message.get()
    const contents = await message.collection('contents').where('replied', '==', false).get()

    const mail = envelope.data()
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

    if (!change.before.exists) {
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

    if (contents.size > 0) {
      await db.runTransaction(trans => {
        return Promise.all(contents.forEach(content => {
          return trans.update(message.collection('contents').doc(content.id), {
            replied: true
          })
        }))
      })
    }

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

      const message = messages.doc(mail.subject)
      const email = await trans.get(message)

      if (!email.exists) {
        await trans.set(message, {
          from: mail.from,
          to: mail.to
        })
      }

      await trans.set(message.collection('contents').doc(mail.message_id), {
        replied: false,
        text: mail.content.text,
        html: mail.content.html
      })
    })
  } catch (err) {
    console.error('Transaction error:', err)
  }

  return res.send('Ok')
})
