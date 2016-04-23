'use strict'

/* global Rx */

const coverage = require('json!./coverage.json')['calc.js']
const source = require('raw!../examples/calc.js')

// mutable data for now
var _incrementCoverage

function makeCoverageStream () {
  // no incoming events yet?
  const lineCoverage = coverage.l

  // change the coverage a couple of times
  return Rx.Observable.create(function (observer) {
    function incrementCoverage (line) {
      if (lineCoverage[line] === undefined) {
        console.error('there is no source on line', line)
        return
      }
      lineCoverage[line] += 1
      observer.onNext({source: source, coverage: coverage})
    }
    window.incrementCoverage = _incrementCoverage = incrementCoverage
  }).startWith({source: source, coverage: coverage})
}

const isSource = (data) => typeof data.source === 'object'
const isLineIncrement = (data) => typeof data.line === 'number'

function coverageUpdates () {
  /* global WebSocket */
  var ws = new WebSocket('ws://localhost:3032')
  ws.onopen = function open () {
    console.log('opened socket')
  }
  ws.onmessage = function message (message) {
    console.log('received socket message', message)
    const data = JSON.parse(message.data)
    if (isSource(data)) {
      console.log('received new source')
      // TODO set new source code
      // TODO reset coverage
      return
    }
    if (isLineIncrement(data)) {
      _incrementCoverage(data.line)
    }
  }
}

module.exports = function setupCoverageSource () {
  coverageUpdates()
  return makeCoverageStream()
}

