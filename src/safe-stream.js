'use strict'

const { createCipheriv, createDecipheriv, randomBytes, createHash } = require('crypto')
const { createGzip, createGunzip } = require('zlib')
const pumpify = require('pumpify') // from npm

function createWriteSafeStream (secret) {
  const initVect = randomBytes(16)
  const cipherKey = createHash('md5').update(secret).digest('hex')
  const encryptStream = createCipheriv('aes256', cipherKey, initVect)
  const gzipStream = createGzip()

  const stream = pumpify(encryptStream, gzipStream)
  stream.initVect = initVect

  return stream
}

function createReadSafeStream (secret, initVect) {
  const cipherKey = createHash('md5').update(secret).digest('hex')
  const decryptStream = createDecipheriv('aes256', cipherKey, initVect)
  const gunzipStream = createGunzip()

  const stream = pumpify(gunzipStream, decryptStream)
  return stream
}

module.exports = {
  createWriteSafeStream,
  createReadSafeStream
}
