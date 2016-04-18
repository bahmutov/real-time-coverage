const Cycle = require('@cycle/core')
const Rx = require('rx')
const {makeDOMDriver} = require('@cycle/dom')
const coverageDom = require('./virtual-coverage')

const source = require('raw!../examples/calc.js')
const sourceToCoverage = coverageDom.bind(null, source)

function view (coverage$) {
  return coverage$.map(sourceToCoverage)
}

function main ({DOM}) {
  // no incoming events yet?
  const fileCoverage = require('json!./coverage.json')['calc.js']
  const lineCoverage = fileCoverage.l

  // change the coverage a couple of times
  const coverage$ = Rx.Observable.create(function (observer) {
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

  return {
    DOM: view(coverage$)
  }
}
Cycle.run(main, { DOM: makeDOMDriver('#app') })
