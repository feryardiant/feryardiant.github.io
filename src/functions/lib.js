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
  const decoded = str.replace(/=\r\n/gm, '')
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

  return arr.reduce((res, item, key) => {
    if (key === 0 || key === arr.length - 1) {
      return res
    }
    res.push(item)
    return res
  }, []).join('\n')
}

const { inspect } = require('util')
const log = exports.log = (...args) => console.log.apply(null, args.map(inspect))

/**
 * @typedef {Object} Author
 * @property {String} name
 * @property {?String} email
 * @property {?String} url
 * @param {String} str
 * @returns {Author|Author[]}
 */
const parseAuthor = (str) => {
  if (typeof str !== 'string') {
    throw new TypeError('expected author to be a string')
  }

  if (str.includes(', ')) {
    return str.split(', ').map(parseAuthor)
  }

  const pattern = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm
  const match = [].concat.apply([], pattern.exec(str))
  const author = {
    name: match[1],
    email: match[2]
  }

  if (author.email === undefined) {
    author.email = author.name
    author.name = undefined
  } else {
    author.name = author.name.replace(/"/g, '')
  }

  if (match[3] !== undefined) {
    author.url = match[3]
  }

  return author
}

/**
 * @typedef {Object} ParsedMail
 * @property {String} raw
 * @property {Author} from
 * @property {Author[]} to
 * @property {Author[]} cc
 * @property {String} subject
 * @property {Number} spam_score
 * @property {String} spam_report
 * @property {Date} date
 * @property {String} message_id
 * @property {Object} charsets
 * @property {Object} content
 * @property {String} content.text
 * @property {String} content.html
 * @param {Buffer} body
 * @param {http.IncomingMessage.headers} headers
 * @returns {ParsedMail}
 */
exports.parseMail = (body, headers) => {
  const getKey = (attr) => attr.replace(/"/g, '').split('=')[1]
  const assertBoundary = (boundary, val) => new RegExp(boundary, 'g').test(val)

  let field
  const boundary = headers['content-type'].split('=')[1]
  const rawBody = body.toString()
  const rawObj = rawBody.replace(/(\r\n|\n|\r)/gm, '\n').split('\n').reduce((obj, line) => {
    if (assertBoundary(boundary, line)) {
      return obj
    }

    if (line.startsWith('Content-Disposition: form-data')) {
      field = getKey(line)
    }

    if (!obj[field]) {
      obj[field] = []
      return obj
    }

    line = beJSON(line)

    if (typeof line === 'string') {
      obj[field].push(line)
    } else {
      obj[field] = line
    }

    return obj
  }, {})

  const mail = {
    raw: rawObj,
    from: null,
    to: null,
    cc: null,
    subject: '',
    spam_score: 0,
    spam_report: [],
    charsets: {},
    content: {}
  }

  for (let [key, value] of Object.entries(rawObj)) {
    if (['dkim', 'sender_ip', 'SPF', 'envelope'].includes(key)) {
      continue
    }

    if (['from', 'to', 'cc', 'subject'].includes(key)) {
      value = value.join('')
    }

    if (key === 'email') {
      const altMail = value.find(val => val.startsWith('Content-Type: multipart/alternative'))
      const altBoundary = getKey(altMail)
      let type, bKey

      value = value.reduce((obj, val, i) => {
        if (assertBoundary(altBoundary, val)) {
          bKey = i
        }

        if (val.startsWith('Content-Type: ') || val.startsWith('Content-Transfer')) {
          type = val.split('; ')[0].split(': ')[1]
          if (type !== 'multipart/alternative') {
            obj[type] = []
          }
          return obj
        }

        if (val.startsWith('Date: ')) {
          mail.date = new Date(val.slice(6))
          return obj
        }

        if (val.startsWith('Message-ID: ')) {
          mail.message_id = val.slice(12)
          return obj
        }

        if (bKey !== i && Array.isArray(obj[type])) {
          obj[type].push(val)
        }

        return obj
      }, {})

      mail.content = {
        text: joinEOL(value['text/plain']),
        html: queryPrintableDecode(value['text/html'].join(''))
      }

      continue
    }

    mail[key] = value
  }

  mail.spam_report = joinEOL(mail.spam_report)
  mail.from = parseAuthor(mail.from)
  mail.to = parseAuthor(mail.to)

  if (mail.subject.startsWith('Re: ')) {
    mail.subject = mail.subject.slice(4)
  }

  if (mail.cc) {
    mail.cc = parseAuthor(mail.cc)
  }

  console.info(mail)
  return mail
}
