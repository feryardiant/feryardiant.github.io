const parseAuthor = require('parse-author')
const quotedPrintable = require('quoted-printable')
const utf8 = require('utf8')

const beJSON = (str) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}

/**
 * @link https://stackoverflow.com/a/25816796/881743
 * @param {String} str
 * @returns {String}
 */
const queryPrintableDecode = (str) => {
  if (typeof str !== 'string') {
    throw new TypeError('expected parameter to be a string')
  }

  const rfc2045out = (match, hex) => String.fromCharCode(parseInt(hex, 16))
  const decoded = str
    .replace(/=\r\n/gm, '')
    .replace(/=([0-9A-F]{2})/gim, rfc2045out)

  return decoded
}

/**
 * @param {Array} arr
 * @returns {String}
 */
const joinEOL = (arr) => {
  if (!Array.isArray(arr)) {
    throw new TypeError('expected parameter to be an array')
  }

  return arr
    .reduce((res, item, key) => {
      if (key === 0 || key === arr.length - 1) {
        return res
      }
      res.push(item)
      return res
    }, [])
    .join('\n')
}

const { inspect } = require('util')
const log = (exports.log = (...args) =>
  console.log.apply(null, args.map(inspect)))

const getKey = (attr) => attr.replace(/"/g, '').split('=')[1]
const assertBoundary = (boundary, val) => new RegExp(boundary, 'g').test(val)
const getBoundary = (attr) => {
  if (attr.startsWith('multipart/') && attr.includes('boundary=')) {
    return getKey(attr)
  }
  return null
}

/**
 * @param {http.IncomingMessage} req
 * @returns {Object}
 */
const parseBody = ({ body, headers }) => {
  const boundary = getBoundary(headers['content-type'])
  const rawBody = body.toString().replace(/(\r\n|\n|\r)/gm, '\n')

  const output = rawBody.split(`\n--${boundary}`).reduce((obj, line) => {
    const matches = line.match(/"(?<key>\S+)"\n\n(?<val>.*)/m)

    if (
      !matches ||
      ['dkim', 'SPF', 'charsets', 'envelope'].includes(matches.groups.key)
    ) {
      return obj
    }

    obj[matches.groups.key] = beJSON(
      line.slice(line.indexOf(matches.groups.val))
    )

    return obj
  }, {})

  return output
}

/**
 * @typedef {Object} MailContent
 * @property {String} body Raw email content.
 * @property {?String} content_type
 * @property {?String} content_transfer_encoding
 * @property {?String} decoded
 *
 * @typedef {Object} Mail
 * @property {String} email Raw email body.
 * @property {Author} from
 * @property {Author[]} to
 * @property {String} subject
 * @property {Number} spam_score
 * @property {String} spam_report
 * @property {Date} date
 * @property {String} message_id
 * @property {MailContent[]} contents
 *
 * @param {http.IncomingMessage} req
 * @returns {Mail}
 */
exports.parseMail = (req) => {
  const mail = parseBody(req)

  mail.to = mail.to.split(', ').map(parseAuthor)
  mail.from = parseAuthor(mail.from)

  if (mail.subject.startsWith('Re: ')) {
    mail.subject = mail.subject.slice(4)
  }

  let b = -1
  const lines = mail.email.split('\n')
  const boundaries = lines
    .filter((line) => line.match(/boundary="(.*?)"/i))
    .map(getKey)
  const email = lines.reduce((obj, line) => {
    if (boundaries.length === 0) {
      return obj
    }

    const isBoundary = boundaries.includes(line.replace(/-/g, ''))

    if (isBoundary) {
      if (b < 0) {
        obj.contents = {}
      }
      b++
    }

    const matches = line.match(/^(\S+):\s/i)

    if (matches) {
      const key = matches[1].toLowerCase().replace(/-/g, '_')
      const value = line.slice(matches[0].length)

      if (value.startsWith('multipart/')) {
        return obj
      }

      if (b < 0) {
        obj[key] = value
        return obj
      }

      if (undefined === obj.contents[b]) {
        obj.contents[b] = {
          body: []
        }
      }

      obj.contents[b][key] = value
      return obj
    }

    if (b >= 0 && obj.contents[b] && !isBoundary) {
      obj.contents[b].body.push(line)
    }

    return obj
  }, {})

  mail.contents = []
  for (const [i, content] of Object.entries(email.contents || {})) {
    const body = content.body.slice(1, -1)

    if (content.content_type.startsWith('text/plain')) {
      content.body = body.join('\n')
    } else {
      content.body = body.join('')
    }

    switch (content.content_transfer_encoding) {
      case 'quoted-printable':
        try {
          content.decoded = utf8.decode(quotedPrintable.decode(content.body))
        } catch (err) {
          console.error(err)
          content.decoded = null
        }
        break
      case 'base64':
        content.decoded = Buffer.from(content.body, 'base64').toString('utf8')
        break
    }

    mail.contents.push(content)
  }

  mail.message_id = email.message_id
  mail.date = new Date(email.date)

  return mail
}
