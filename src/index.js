'use strict'

const path = require('path')
const la = require('lazy-ass')
const is = require('check-more-types')

function liveStatementCoverage (cb, filename, fileCoverage) {
  la(is.fn(cb), 'expected callback', cb)
  la(is.unemptyString(filename), 'not a filename', filename)
  la(is.object(fileCoverage), 'missing file coverage', fileCoverage)
  la(is.object(fileCoverage.s), 'missing statement coverage in', fileCoverage)

  const name = path.basename(filename)
  // console.log('live statement mapping for', name)

  Object.keys(fileCoverage.s).forEach((statementIndex) => {
    var counter = fileCoverage.s[statementIndex]
    Object.defineProperty(fileCoverage.s, statementIndex, {
      enumerable: true,
      get: () => counter,
      set: (x) => {
        counter = x
        cb({
          name: name,
          filename: filename,
          s: statementIndex,
          counter: x
        })
      // console.log(name, ': s', statementIndex, x)
      }
    })
  })
  return fileCoverage
}

module.exports = liveStatementCoverage
