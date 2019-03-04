'use strict'

const { createReadStream, createWriteStream } = require('fs')
const { pipeline } = require('stream')
const { createReadSafeStream } = require('./safe-stream')

const [, , src, dest, secret, initVect] = process.argv

const readSafeStream = createReadSafeStream(secret, Buffer.from(initVect, 'hex'))

pipeline(
  createReadStream(src),
  readSafeStream,
  createWriteStream(dest),
  function onEnd (err) {
    if (err) {
      console.error(`Error: ${err}`)
      process.exit(1)
    }

    console.log('Done!')
  }
)
