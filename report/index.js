const Cycle = require('@cycle/core')
const Rx = require('rx')
const {makeDOMDriver, pre, table, tr, td, span, div} = require('@cycle/dom')

function coverageDom (coverage) {
  return pre([
    table('.coverage', [
      tr([
        td('.linecount .quiet', '1\n2\n3\n4\n5'),
        td('.line-coverage .quiet', [
          div('.cline-any .cline-yes', '1×'),
          div('.cline-any .cline-neutral', ' '),
          div('.cline-any .cline-yes', '1×'),
          div('.cline-any .cline-yes', '2×'),
          div('.cline-any .cline-neutral', ' ')
        ]),
        td('.text',
          pre('.lang-js', `// example program to be instrumented
function add(a, b) {
  return a + b
}`
            )
          )
      ])
    ])
  ])
}

function view (coverage$) {
  return coverage$.map(coverageDom)
}

function main ({DOM}) {
  // no incoming events yet
  const cover = {foo: 'bar'}
  const coverage$ = Rx.Observable.just(cover)
  return {
    DOM: view(coverage$)
  }
}
Cycle.run(main, { DOM: makeDOMDriver('#app') })
