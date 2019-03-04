'use strict'

const { pipeline } = require('stream')
const { createDecgz } = require('./encgz-stream')

const [, , secret, initVect] = process.argv

const decgz = createDecgz(secret, Buffer.from(initVect, 'hex'))

pipeline(process.stdin, decgz, process.stdout, function onEnd (err) {
  if (err) {
    console.error(`Error: ${err}`)
    process.exit(1)
  }
})
