'use strict'

const {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash
} = require('crypto')
const { createGzip, createGunzip } = require('zlib')
const pumpify = require('pumpify') // from npm

function getChiperKey (secret) {
  return createHash('md5')
    .update(secret)
    .digest('hex')
}

function createEncgz (secret) {
  const initVect = randomBytes(16)
  const cipherKey = getChiperKey(secret)
  const encryptStream = createCipheriv('aes256', cipherKey, initVect)
  const gzipStream = createGzip()

  const stream = pumpify(encryptStream, gzipStream)
  stream.initVect = initVect

  return stream
}

function createDecgz (secret, initVect) {
  const cipherKey = getChiperKey(secret)
  const decryptStream = createDecipheriv('aes256', cipherKey, initVect)
  const gunzipStream = createGunzip()

  const stream = pumpify(gunzipStream, decryptStream)
  return stream
}

module.exports = {
  createEncgz,
  createDecgz
}
