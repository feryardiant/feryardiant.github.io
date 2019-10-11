const beJSON = (str) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}

/**
 * @link https://stackoverflow.com/a/25816796/881743
 */
const queryPrintableDecode = (str) => {
  const rfc2045out = (match, hex) => String.fromCharCode(parseInt(hex, 16))
  const decoded = str.replace(/=\r\n/gm, '')
    .replace(/=([0-9A-F]{2})/gim, rfc2045out)
  //const { StringDecoder } = require('string_decoder')
  //const decoder = new StringDecoder('utf8')

  //return decoder.write(Buffer.from(decoded))
  return decoded
}

const joinEOL = (arr) => {
  return arr.reduce((res, item, key) => {
    if (key === 0 || key === arr.length - 1) {
      return res
    }
    res.push(item)
    return res
  }, []).join('\n')
}

exports.parse = (body, headers) => {
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

  const mail = {
    dkim: '',
    SPF: '',
    sender_ip: '',
    from: '',
    to: [],
    envelope: {},
    subject: '',
    spam_score: 0,
    spam_report: [],
    charsets: {},
    email: []
  }

  for (let [key, value] of Object.entries(rawObj)) {
    if (['dkim', 'SPF', 'sender_ip', 'from', 'subject'].includes(key)) {
      value = value.join('')
    }

    if ('email' === key) {
      const altMail = value.find(val => val.startsWith('Content-Type: multipart/alternative'))
      const altBoundary = getKey(altMail)
      let type, bKey = 0

      value = value.reduce((obj, val, i) => {
        if (assertBoundary(altBoundary, val)) {
          bKey = i
        }

        if (val.startsWith('Content-Type: ')) {
          type = val.split('; ')[0].split(': ')[1]
          if ('multipart/alternative' !== type) {
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
    }

    mail[key] = value
  }

  mail.spam_report = joinEOL(mail.spam_report)
  mail.email['text/plain'] = joinEOL(mail.email['text/plain'])
  mail.email['text/html'] = queryPrintableDecode(mail.email['text/html'].join(''))

  return mail
}

