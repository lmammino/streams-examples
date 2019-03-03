'use strict'

const { readFileSync, writeFileSync } = require('fs')

const [, , src, dest] = process.argv
const content = readFileSync(src)
writeFileSync(dest, content)
