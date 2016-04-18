const {pre, table, tr, td} = require('@cycle/dom')

function sourceLineToRow (coverage, sourceLine, index) {
  const line = String(index + 1)
  const lineCover = coverage.l[line]
  const hasSource = lineCover !== undefined
  let lineClass = '.cline-neutral'
  if (hasSource) {
    lineClass = lineCover ? '.cline-yes' : '.cline-no'
  }
  const lineCount = lineCover ? lineCover + '×' : ''
  return tr('.line', [
    td('.linecount .quiet', line),
    td('.cline-any ' + lineClass, lineCount),
    td('.text',
      pre('.lang-js', sourceLine)
    )
  ])
}

function coverageDom (source, coverage) {
  const lines = source.split('\n')
  return table('.coverage', lines.map(sourceLineToRow.bind(null, coverage)))
}

module.exports = coverageDom
