'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('replacing property with get/set functions', () => {
  const o = {
    foo: 10
  }
  var value = o.foo
  Object.defineProperty(o, 'foo', {
    enumerable: true,
    get: () => value,
    set: (x) => {
      value = x
    }
  })

  it('works with initial value', () => {
    la(is.has(o, 'foo'))
    la(o.foo === 10, 'initial value', o)
  })

  it('it works on set', () => {
    o.foo = 11
    la(o.foo === 11, o)
  })

  it('it works on increment', () => {
    o.foo = 10
    la(o.foo === 10, o)
    o.foo += 1
    la(o.foo === 11, 'incremented', o)
  })
})
