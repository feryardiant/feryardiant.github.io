const { https, config } = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const { log, parseMail } = require('./lib')
const db = admin.firestore()
const conf = config()

const sg = require('@sendgrid/mail')
sg.setApiKey(conf.sendgrid.key)

exports.mail = https.onRequest((req, res) => {
  if (req.method.toLowerCase() !== 'post') {
    req.status(403).end()
    return
  }

  const email = parseMail(req.body, req.headers)
  // const inbox = db.doc('messages')

  sg.send({
    to: email.from,
    from: 'noreply@feryardiant.id',
    subject: `Re: ${email.subject}`,
    text: 'Hi there,\n\nI\'ve recieved your mail and will back to you soon.'
  })

  log(email)
  // inbox.set(email)

  res.send('Ok')
})

exports.app = https.onRequest((req, res) => {
  res.status(200).end('Ok')
})

exports.auth = https.onRequest((req, res) => {
  res.status(200).end('Ok')
})
