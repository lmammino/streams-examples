'use strict'

const { createReadStream, createWriteStream } = require('fs')
const { pipeline } = require('stream')
const { createWriteSafeStream } = require('./safe-stream')

const [, , src, dest, secret] = process.argv

const writeSafeStream = createWriteSafeStream(secret)
console.log(`init vector: ${writeSafeStream.initVect.toString('hex')}`)

pipeline(
  createReadStream(src),
  writeSafeStream,
  createWriteStream(dest),
  function onEnd (err) {
    if (err) {
      console.error(`Error: ${err}`)
      process.exit(1)
    }

    console.log('Done!')
  }
)
