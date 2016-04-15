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
  const fileCoverage = coverage['calc.js']
  return table('.coverage', lines.map(sourceLineToRow.bind(null, fileCoverage)))
}

function view (coverage$) {
  return coverage$.map(coverageDom)
}

function main ({DOM}) {
  // no incoming events yet?
  const cover = require('json!./coverage.json')
  const coverage$ = Rx.Observable.just(cover)
  return {
    DOM: view(coverage$)
  }
}
Cycle.run(main, { DOM: makeDOMDriver('#app') })
