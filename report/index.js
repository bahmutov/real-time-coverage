const Cycle = require('@cycle/core')
const Rx = require('rx')
const {makeDOMDriver} = require('@cycle/dom')
const coverageDom = require('./virtual-coverage')

const source = require('raw!../examples/calc.js')
const sourceToCoverage = coverageDom.bind(null, source)

function view (coverage$) {
  return coverage$.map(sourceToCoverage)
}

function makeCoverageStream (fileCoverage) {
  // no incoming events yet?
  const lineCoverage = fileCoverage.l

  // change the coverage a couple of times
  return Rx.Observable.create(function (observer) {
    function incrementCoverage (line) {
      if (lineCoverage[line] === undefined) {
        console.error('there is no source on line', line)
        return
      }
      lineCoverage[line] += 1
      observer.onNext(fileCoverage)
    }
    window.incrementCoverage = incrementCoverage
  }).startWith(fileCoverage)
}

function main ({DOM}) {
  // dirty code
  const coverage = require('json!./coverage.json')['calc.js']
  const coverage$ = makeCoverageStream(coverage)
  return {
    DOM: view(coverage$)
  }
}
const sources = {
  DOM: makeDOMDriver('#app')
}
Cycle.run(main, sources)
