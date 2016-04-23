/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	/* global CycleDOM, Cycle */

	const {makeDOMDriver} = CycleDOM
	const coverageDom = __webpack_require__(1)
	const coverageSource = __webpack_require__(2)

	function main ({DOM}) {
	  // dirty code
	  const coverage$ = coverageSource()
	  const dom$ = coverageDom(coverage$)

	  return {
	    DOM: dom$
	  }
	}
	const sources = {
	  DOM: makeDOMDriver('#app')
	}
	Cycle.run(main, sources)


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict'

	/* global CycleDOM */
	const {pre, table, tr, td} = CycleDOM

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

	function coverageDom ({source, coverage}) {
	  const lines = source.split('\n')
	  return table('.coverage', lines.map(sourceLineToRow.bind(null, coverage)))
	}

	module.exports = (coverage__) => coverage__.map(coverageDom)


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	/* global Rx */

	const coverage = __webpack_require__(3)['calc.js']
	const source = __webpack_require__(4)

	// mutable data for now
	var _incrementCoverage

	function makeCoverageStream () {
	  // no incoming events yet?
	  const lineCoverage = coverage.l

	  // change the coverage a couple of times
	  return Rx.Observable.create(function (observer) {
	    function incrementCoverage (line) {
	      if (lineCoverage[line] === undefined) {
	        console.error('there is no source on line', line)
	        return
	      }
	      lineCoverage[line] += 1
	      observer.onNext({source: source, coverage: coverage})
	    }
	    window.incrementCoverage = _incrementCoverage = incrementCoverage
	  }).startWith({source: source, coverage: coverage})
	}

	const isSource = (data) => typeof data.source === 'object'
	const isLineIncrement = (data) => typeof data.line === 'number'

	function coverageUpdates () {
	  /* global WebSocket */
	  var ws = new WebSocket('ws://localhost:3032')
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
	      return
	    }
	    if (isLineIncrement(data)) {
	      _incrementCoverage(data.line)
	    }
	  }
	}

	module.exports = function setupCoverageSource () {
	  coverageUpdates()
	  return makeCoverageStream()
	}



/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
		"calc.js": {
			"path": "calc.js",
			"s": {
				"1": 1,
				"2": 1,
				"3": 1,
				"4": 0,
				"5": 1,
				"6": 0,
				"7": 0,
				"8": 0,
				"9": 1
			},
			"b": {
				"1": [
					0,
					0
				]
			},
			"f": {
				"1": 1,
				"2": 0,
				"3": 0
			},
			"fnMap": {
				"1": {
					"name": "add",
					"line": 2,
					"loc": {
						"start": {
							"line": 2,
							"column": 0
						},
						"end": {
							"line": 2,
							"column": 19
						}
					}
				},
				"2": {
					"name": "sub",
					"line": 6,
					"loc": {
						"start": {
							"line": 6,
							"column": 0
						},
						"end": {
							"line": 6,
							"column": 19
						}
					}
				},
				"3": {
					"name": "abs",
					"line": 10,
					"loc": {
						"start": {
							"line": 10,
							"column": 0
						},
						"end": {
							"line": 10,
							"column": 16
						}
					}
				}
			},
			"statementMap": {
				"1": {
					"start": {
						"line": 2,
						"column": 0
					},
					"end": {
						"line": 4,
						"column": 1
					}
				},
				"2": {
					"start": {
						"line": 3,
						"column": 2
					},
					"end": {
						"line": 3,
						"column": 14
					}
				},
				"3": {
					"start": {
						"line": 6,
						"column": 0
					},
					"end": {
						"line": 8,
						"column": 1
					}
				},
				"4": {
					"start": {
						"line": 7,
						"column": 2
					},
					"end": {
						"line": 7,
						"column": 14
					}
				},
				"5": {
					"start": {
						"line": 10,
						"column": 0
					},
					"end": {
						"line": 15,
						"column": 1
					}
				},
				"6": {
					"start": {
						"line": 11,
						"column": 2
					},
					"end": {
						"line": 13,
						"column": 3
					}
				},
				"7": {
					"start": {
						"line": 12,
						"column": 4
					},
					"end": {
						"line": 12,
						"column": 13
					}
				},
				"8": {
					"start": {
						"line": 14,
						"column": 2
					},
					"end": {
						"line": 14,
						"column": 10
					}
				},
				"9": {
					"start": {
						"line": 16,
						"column": 0
					},
					"end": {
						"line": 16,
						"column": 33
					}
				}
			},
			"branchMap": {
				"1": {
					"line": 11,
					"type": "if",
					"locations": [
						{
							"start": {
								"line": 11,
								"column": 2
							},
							"end": {
								"line": 11,
								"column": 2
							}
						},
						{
							"start": {
								"line": 11,
								"column": 2
							},
							"end": {
								"line": 11,
								"column": 2
							}
						}
					]
				}
			},
			"l": {
				"2": 1,
				"3": 1,
				"6": 1,
				"7": 0,
				"10": 1,
				"11": 0,
				"12": 0,
				"14": 0,
				"16": 1
			}
		}
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "// example program to be instrumented\nfunction add(a, b) {\n  return a + b\n}\n\nfunction sub(a, b) {\n  return a - b\n}\n\nfunction abs(x) {\n  if (x < 0) {\n    return -x\n  }\n  return x\n}\nconsole.log('2 + 3 =', add(2, 3))\n"

/***/ }
/******/ ]);