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
  return arr.reduce((res, item, key) => {
    if (key === 0 || key === arr.length - 1) {
      return res
    }
    res.push(item)
    return res
  }, []).join('\n')
}

const { inspect } = require('util')
exports.log = (...args) => console.log.apply(null, args.map(inspect))

/**
 * @param {Buffer} body
 * @param {http.IncomingMessage.headers} headers
 * @returns {ParsedMail}
 */
exports.parseMail = (body, headers) => {
  const getKey = (attr) => attr.replace(/"/g, '').split('=')[1]
  const assertBoundary = (boundary, val) => new RegExp(boundary, 'g').test(val)

  let field
  const boundary = headers['content-type'].split('=')[1]
  const rawObj = body.toString().replace(/(\r\n|\n|\r)/gm, '\n').split('\n').reduce((obj, line) => {
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

  /**
   * @typedef {Object} ParsedMail
   * @property {String} sender_ip
   * @property {String} from
   * @property {Array} to
   * @property {Object} envelope
   * @property {String} envelope.from
   * @property {Array} envelope.to
   * @property {String} subject
   * @property {Number} spam_score
   * @property {String} spam_report
   * @property {Object} charsets
   * @property {Object} content
   * @property {String} content.text
   * @property {String} content.html
   */
  const mail = {
    sender_ip: '',
    from: '',
    to: [],
    envelope: {},
    subject: '',
    spam_score: 0,
    spam_report: [],
    charsets: {},
    content: {}
  }

  for (let [key, value] of Object.entries(rawObj)) {
    if (['dkim', 'SPF'].includes(key)) {
      continue
    }

    if (['sender_ip', 'from', 'subject'].includes(key)) {
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

        if (val.startsWith('Content-Type: ')) {
          type = val.split('; ')[0].split(': ')[1]
          if (type !== 'multipart/alternative') {
            obj[type] = []
          }
          return obj
        }

        if (val.startsWith('Content-Transfer')) {
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

  return mail
}
