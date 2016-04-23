'use strict'

/* global CycleDOM, Cycle */

const {makeDOMDriver} = CycleDOM
const coverageDom = require('./virtual-coverage')
const coverageSource = require('./coverage-source')

const source = require('raw!../examples/calc.js')
const sourceToCoverage = coverageDom.bind(null, source)

function view (coverage$) {
  return coverage$.map(sourceToCoverage)
}

function main ({DOM}) {
  // dirty code
  const coverage$ = coverageSource()

  return {
    DOM: view(coverage$)
  }
}
const sources = {
  DOM: makeDOMDriver('#app')
}
Cycle.run(main, sources)
