const Busboy = require('busboy')
const { extname } = require('path')
const { writeFileSync } = require('fs')
const { simpleParser } = require('mailparser')

/**
 * @typedef {object} Person
 * @property {string} address The email address.
 * @property {string} name The Person name
 *
 * @typedef {object} Attachment
 * @property {string?} filename
 * @property {number} size
 * @property {Buffer} content
 * @property {string?} contentId
 * @property {string} contentType
 * @property {string} contentDisposition
 * @property {string?} cid
 * @property {string} checksum
 * @property {boolean} related
 * @property {boolean?} isUploaded
 * @property {import('@google-cloud/storage').File?} uploadedFile
 *
 * @typedef {object} Mail
 * @property {string} spamReport
 * @property {number} spamScore
 * @property {string} senderIp
 * @property {string} messageId
 * @property {string} subject
 * @property {string} topic
 * @property {string} date
 * @property {Person[]} to
 * @property {Person} from
 * @property {Person?} replyTo
 * @property {Person[]?} cc
 * @property {string?} inReplyTo
 * @property {string[]?} references
 * @property {string?} html
 * @property {string?} text
 * @property {string?} textAsHtml
 * @property {Attachment[]} attachments
 *
 * @param {Buffer} body
 * @returns {Promise<Mail>}
 */
async function normalizeMail(body) {
  const parsed = await simpleParser(body.email)
  const references = (parsed.references || '').split(',')

  const mail = {
    spamReport: body.spam_report,
    spamScore: parseFloat(body.spam_score),
    senderIp: body.sender_ip,
    subject: body.subject,
    date: parsed.date,
    messageId: parsed.messageId,
    to: parsed.to.value,
    from: parsed.from.value[0],
  }

  if (references.length > 0) {
    mail.references = references
  }

  if (parsed.headers.has('thread-topic')) {
    mail.topic = parsed.headers.get('thread-topic')
  }

  for (let participant of ['cc', 'replyTo']) {
    if (parsed[participant]) {
      mail[participant] = parsed[participant].value
    }
  }

  for (let contentType of ['inReplyTo', 'html', 'text', 'textAsHtml']) {
    if (parsed[contentType]) {
      mail[contentType] = parsed[contentType]
    }
  }

  mail.attachments = parsed.attachments

  return mail
}

const bodyParser = (req, res, next) => {
  if (req.method !== 'POST' && !req.headers['content-type']?.startsWith('multipart/form-data')) {
    return next()
  }

  const busboy = new Busboy({ headers: req.headers })

  busboy.on('field', (fieldname, value) => {
    req.body[fieldname] = value
  })

  busboy.on('finish', () => {
    next()
  })

  busboy.end(req.rawBody)
  req.pipe(busboy)
}

/**
 *
 * @param {Express} app
 * @param {FirebaseFirestore.Firestore} db
 * @param {import('firebase-functions').logger} logger
 * @param {import('@google-cloud/storage').Bucket} bucket
 * @returns
 */
module.exports = (app, db, logger, bucket) => {
  app.use(bodyParser)

  const messages = db.collection('messages')

  /**
   * @param {Attachment} file
   * @returns {Promise<import('@google-cloud/storage').File>}
   */
  const saveToBucket = async (file) => new Promise((resolve, reject) => {
    const newName = `${file.checksum}${extname(file.filename).toLowerCase()}`
    const ref = bucket.file(`attachments/${newName}`)
    const stream = ref.createWriteStream({
      public: true,
      metadata: {
        contentType: file.contentType
      }
    })

    stream.on('error', (err) => {
      logger.error(err)
      file.isUploaded = false
      reject(err)
    })

    stream.on('finish', () => {
      logger.info(`File stored as "${newName}"`)
      file.isUploaded = true
      resolve(ref)
    })

    stream.end(file.content)
  })

  app.post('/', async (req, res) => {
    const { messageId, attachments, ...envelope } = await normalizeMail(req.body)

    try {
      for (let attachment of attachments) {
        if (attachment.contentDisposition === 'inline') {
          continue
        }

        attachment.uploadedFile = await saveToBucket(attachment)
      }

      await db.runTransaction(async trans => {
        const message = messages.doc(messageId)
        await trans.set(message, envelope)

        for (let attachment of attachments) {
          if (attachment.contentDisposition === 'inline') continue

          const attachmentRef = message.collection('attachments').doc(attachment.checksum)

          await trans.set(attachmentRef, {
            filename: attachment.filename,
            size: attachment.size,
            contentType: attachment.contentType,
            contentDisposition: attachment.contentDisposition,
            checksum: attachment.checksum,
            isUploaded: attachment.isUploaded,
            publicUrl: attachment.uploadedFile.publicUrl(),
          })
        }
      })

      logger.info(`Message from ${envelope.from.address} recieved`, {
        messageId
      })
    } catch (err) {
      logger.error(err)
    }

    res.sendStatus(200)
  })

  return app
}
