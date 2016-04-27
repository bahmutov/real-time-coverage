'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('live file coverage', () => {
  const fileCoverage = {
    s: {
      '1': 2,
      '2': 0
    }
  }
  const copy = (o) => JSON.parse(JSON.stringify(o))
  const liverage = require('./index')

  it('is a function', () => {
    la(is.fn(liverage))
  })

  it('makes file coverage live', () => {
    const filename = 'foo/bar.js'
    const o = copy(fileCoverage)
    var called = 0
    function covered (options) {
      la(is.object(options), options)
      la(options.filename === filename, 'wrong filename', options)
      la(options.s === '2', 'wrong statement index', options)
      la(options.counter === 1, 'wrong counter', options)
      called += 1
    }
    const liveCoverage = liverage(covered, filename, o)
    la(is.object(liveCoverage), 'has not returned a value', liveCoverage)
    liveCoverage.s['2'] += 1
    la(called === 1, 'called once')
  })
})
