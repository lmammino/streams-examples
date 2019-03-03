'use strict'

const { createReadStream, createWriteStream } = require('fs')

const [, , src, dest] = process.argv
const srcStream = createReadStream(src)
const destStream = createWriteStream(dest)

srcStream.on('data', data => {
  const canContinue = destStream.write(data)
  if (!canContinue) {
    // we are overflowing the destination, we should pause
    srcStream.pause()
  }
})

// when drain is emitted by the writable destination, it is safe
// to resume writing
destStream.on('drain', () => srcStream.resume())
