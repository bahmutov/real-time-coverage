'use strict'

/* global Rx */

// const source = require('raw!../examples/calc.js')

const isSource = (data) => typeof data.source === 'string'
const isLineIncrement = (data) => typeof data.line === 'number'

function createCoverageStream () {
  // mutable data for now
  return Rx.Observable.create(function (observer) {
    var source
    const coverage = require('json!./coverage.json')['calc.js']
    const lineCoverage = coverage.l

    function setSource (s) {
      source = s
      observer.onNext({source, coverage})
    }

    function incrementCoverage (line) {
      if (lineCoverage[line] === undefined) {
        console.error('there is no source on line', line)
        return
      }
      lineCoverage[line] += 1
      observer.onNext({source, coverage})
    }

    /* global WebSocket */
    const ws = new WebSocket('ws://localhost:3032')
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
        source = data.source
        return observer.onNext({source, coverage})
      }
      if (isLineIncrement(data)) {
        // _incrementCoverage(data.line)
        // TODO increment coverage for particular line
      }
    }

    // a couple of testing shortcuts
    window.liverage = {setSource, incrementCoverage}
  })
}

module.exports = createCoverageStream
