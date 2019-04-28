'use strict'

const { Writable } = require('readable-stream')

class DOMAppend extends Writable {
  constructor (target, tag = 'p', options) {
    super(options)
    this._target = target
    this._tag = tag
  }

  _write (chunk, encoding, done) {
    const elem = document.createElement(this._tag)
    const content = document.createTextNode(chunk.toString())
    elem.appendChild(content)
    elem.className = 'hidden'
    this._target.appendChild(elem)
    elem.className = 'fade-in'
    done()
  }
}

module.exports = DOMAppend
