'use strict'

const EmojiStream = require('../emoji-stream')
const Uppercasify = require('../uppercasify')
const Delay = require('../delay')
const DOMAppend = require('../dom-append')

const list = document.getElementById('list')
const emoji = new EmojiStream()
const uppercasify = new Uppercasify()
const delay = new Delay(100)
const append = new DOMAppend(list, 'li')

emoji
  .pipe(uppercasify)
  .pipe(delay)
  .pipe(append)
