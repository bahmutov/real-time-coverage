const Cycle = require('@cycle/core')
const Rx = require('rx')
const {makeDOMDriver, pre, table, tr, td} = require('@cycle/dom')

const source = require('raw!../examples/calc.js')
// const source = `// example program to be instrumented
// function add(a, b) {
//   return a + b
// }

// function sub(a, b) {
//   return a - b
// }

// function abs(x) {
//   if (x < 0) {
//     return -x
//   }
//   return x
// }
// console.log('2 + 3 =', add(2, 3))
// `

const lines = source.split('\n')

function sourceLineToRow (sourceLine, index) {
  return tr('.line', [
    td('.linecount .quiet', String(index + 1)),
    td('.cline-any .cline-yes', '1×'),
    td('.text',
      pre('.lang-js', sourceLine)
    )
  ])
}

function coverageDom (coverage) {
  return table('.coverage', lines.map(sourceLineToRow))
// return pre([
//   table('.coverage', [
//     tr([
//       td('.linecount .quiet', '1\n2\n3\n4\n5'),
//       td('.line-coverage .quiet', [
//         div('.cline-any .cline-yes', '1×'),
//         div('.cline-any .cline-neutral', ' '),
//         div('.cline-any .cline-yes', '1×'),
//         div('.cline-any .cline-yes', '2×'),
//         div('.cline-any .cline-neutral', ' ')
//       ]),
//       td('.text',
//         pre('.lang-js', source
//           )
//         )
//     ])
//   ])
// ])
}

function view (coverage$) {
  return coverage$.map(coverageDom)
}

function main ({DOM}) {
  // no incoming events yet?
  const cover = {foo: 'bar'}
  const coverage$ = Rx.Observable.just(cover)
  return {
    DOM: view(coverage$)
  }
}
Cycle.run(main, { DOM: makeDOMDriver('#app') })
