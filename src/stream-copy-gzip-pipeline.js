'use strict'

const { pipeline } = require('stream')
const { createReadStream, createWriteStream } = require('fs')
const { createGzip } = require('zlib')

const [, , src, dest] = process.argv

pipeline(
  createReadStream(src),
  createGzip(),
  createWriteStream(dest),
  function onEnd (err) {
    if (err) {
      console.error(`Error: ${err}`)
      process.exit(1)
    }

    console.log('Done!')
  }
)
