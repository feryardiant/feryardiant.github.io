const { https, config } = require('firebase-functions')
// const admin = require('firebase-admin')
// admin.initializeApp()

const { log, parseMail } = require('./lib')
// const db = admin.firestore()
const conf = config()

const sg = require('@sendgrid/mail')
sg.setApiKey(conf.sendgrid.key)

exports.mail = https.onRequest(async (req, res) => {
  if (req.method.toLowerCase() !== 'post') {
    return res.status(403).send('Error')
  }

  const email = parseMail(req.body, req.headers)
  // const inbox = db.doc('messages')

  log(email)
  const subject = email.subject.startsWith('Re: ') ? email.subject.slice(4) : email.subject
  const noReply = {
    name: 'Auto Reply [at] feryardiant.id',
    email: 'noreply@feryardiant.id'
  }

  const reply = [
    {
      to: email.from,
      from: noReply,
      replyTo: noReply,
      headers: {
        'In-Reply-To': email.message_id
      },
      subject: `Re: ${subject}`,
      text: 'Hi there,\n\nI\'ve recieved your mail and will back to you soon.'
    },
    {
      to: 'ferywardiyanto@gmail.com',
      from: noReply,
      replyTo: email.from,
      headers: {
        'In-Reply-To': email.message_id
      },
      subject: `Re: ${subject}`,
      text: email.content.text,
      html: email.content.html
    }
  ]

  if (email.cc) {
    reply[0].cc = email.cc
  }

  await sg.send(reply)

  // inbox.set(email)

  return res.send('Ok')
})

exports.app = https.onRequest((req, res) => {
  res.status(200).end('Ok')
})

exports.auth = https.onRequest((req, res) => {
  res.status(200).end('Ok')
})
