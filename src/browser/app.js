'use strict'

const EmojiStream = require('../emoji-stream')
const Uppercasify = require('../uppercasify')
const Stagger = require('../stagger')
const DOMAppend = require('../dom-append')

const list = document.getElementById('list')
const emoji = new EmojiStream()
const uppercasify = new Uppercasify()
const stagger = new Stagger(100)
const append = new DOMAppend(list, 'li')

emoji
  .pipe(uppercasify)
  .pipe(stagger)
  .pipe(append)
