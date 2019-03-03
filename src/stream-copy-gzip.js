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

gzipStream.on('drain', () => {
  srcStream.resume()
})

gzipStream.on('data', data => {
  const canContinue = destStream.write(data)
  if (!canContinue) {
    gzipStream.pause()
  }
})

gzipStream.on('end', () => {
  destStream.end()
})

destStream.on('drain', () => {
  gzipStream.resume()
})
