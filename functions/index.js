const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors')

const app = express()
const { parse } = require('./mail-parser')

const { inspect } = require('util')
const log = (...args) => console.log.apply(null, args.map(inspect))

app.use(cors())

app.post('', (req, res) => {
  const mail = parse(req.body, req.headers)

  log(mail)

  res.send('Ok')
})

exports.message = functions.https.onRequest(app)
