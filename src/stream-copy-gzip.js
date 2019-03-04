'use strict'

const { createReadStream, createWriteStream } = require('fs')
const { createGzip } = require('zlib')

const [, , src, dest] = process.argv
const srcStream = createReadStream(src)
const gzipStream = createGzip()
const destStream = createWriteStream(dest)

srcStream.on('data', data => {
  const canContinue = gzipStream.write(data)
  if (!canContinue) {
    srcStream.pause()
    gzipStream.once('drain', () => srcStream.resume())
  }
})

srcStream.on('end', () => {
  // check if there's buffered data to be flushed
  const remainingData = gzipStream.read()
  if (remainingData !== null) {
    destStream.write()
  }
  gzipStream.end()
})

gzipStream.on('data', data => {
  const canContinue = destStream.write(data)
  if (!canContinue) {
    gzipStream.pause()
    destStream.once('drain', () => gzipStream.resume())
  }
})

gzipStream.on('end', () => {
  destStream.end()
})

// TODO: handle errors! >:)
