'use strict'

const isSource = (data) => typeof data.source === 'string'
const isLineIncrement = (data) => typeof data.line === 'number'

function createCoverageStream () {
  /* global Rx, WebSocket */
  return Rx.Observable.create(function (observer) {
    // mutable data for now?
    var source
    var coverage = require('json!./coverage.json')['calc.js']

    function setSource (s) {
      source = s
      observer.onNext({source, coverage})
    }

    // function setCoverage (c) {
    //   coverage = c
    //   observer.onNext({source, coverage})
    // }

    function incrementCoverage (line) {
      const lineCoverage = coverage.l
      if (lineCoverage[line] === undefined) {
        console.error('there is no source on line', line)
        return
      }
      lineCoverage[line] += 1
      observer.onNext({source, coverage})
    }

    const ws = new WebSocket('ws://localhost:3032')
    ws.onopen = function open () {
      console.log('opened socket')
    }
    ws.onmessage = function message (message) {
      console.log('received socket message', message)
      const data = JSON.parse(message.data)
      if (isSource(data)) {
        console.log('received new source')
        // TODO reset coverage
        source = data.source
        coverage = null
        return observer.onNext({source, coverage})
      }
      if (isLineIncrement(data)) {
        return incrementCoverage(data.line)
      }
    }

    // a couple of testing shortcuts
    window.liverage = {setSource, incrementCoverage}
  })
}

module.exports = createCoverageStream
