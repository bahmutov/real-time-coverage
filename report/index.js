const Cycle = require('@cycle/core')
const Rx = require('rx')
const {makeDOMDriver, pre, table, tr, td} = require('@cycle/dom')

const source = require('raw!../examples/calc.js')
const lines = source.split('\n')

function sourceLineToRow (coverage, sourceLine, index) {
  const line = String(index + 1)
  const lineCover = coverage.l[line]
  const hasSource = lineCover !== undefined
  let lineClass = '.cline-neutral'
  if (hasSource) {
    lineClass = lineCover ? '.cline-yes' : '.cline-no'
  }
  return tr('.line', [
    td('.linecount .quiet', line),
    td('.cline-any ' + lineClass, lineCover ? lineCover + '×' : ''),
    td('.text',
      pre('.lang-js', sourceLine)
    )
  ])
}

function coverageDom (coverage) {
  return table('.coverage', lines.map(sourceLineToRow.bind(null, coverage)))
}

function view (coverage$) {
  return coverage$.map(coverageDom)
}

function main ({DOM}) {
  // no incoming events yet?
  const fileCoverage = require('json!./coverage.json')['calc.js']
  // change the coverage a couple of times
  const coverage$ = Rx.Observable.create(function (observer) {
    function incrementCoverage (line) {
      if (fileCoverage.l[line] === undefined) {
        console.error('there is no source on line', line)
        return
      }
      fileCoverage.l[line] += 1
      observer.onNext(fileCoverage)
    }
    window.incrementCoverage = incrementCoverage
  }).startWith(fileCoverage)
  // const coverage$ = Rx.Observable.just(fileCoverage)

  return {
    DOM: view(coverage$)
  }
}
Cycle.run(main, { DOM: makeDOMDriver('#app') })
