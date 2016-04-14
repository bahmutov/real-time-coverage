
var __cov_ObzDDNDNs_OZn0nZzs6vsw = (Function('return this'))();
if (!__cov_ObzDDNDNs_OZn0nZzs6vsw.__coverage__) { __cov_ObzDDNDNs_OZn0nZzs6vsw.__coverage__ = {}; }
__cov_ObzDDNDNs_OZn0nZzs6vsw = __cov_ObzDDNDNs_OZn0nZzs6vsw.__coverage__;

// console.log('coverage object')
// console.log(__cov_ObzDDNDNs_OZn0nZzs6vsw)

if (!(__cov_ObzDDNDNs_OZn0nZzs6vsw['/Users/gleb/git/real-time-coverage/examples/calc.js'])) {
   __cov_ObzDDNDNs_OZn0nZzs6vsw['/Users/gleb/git/real-time-coverage/examples/calc.js'] = {"path":"/Users/gleb/git/real-time-coverage/examples/calc.js","s":{"1":1,"2":0,"3":1,"4":0,"5":1,"6":0,"7":0,"8":0,"9":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"add","line":2,"loc":{"start":{"line":2,"column":0},"end":{"line":2,"column":19}}},"2":{"name":"sub","line":6,"loc":{"start":{"line":6,"column":0},"end":{"line":6,"column":19}}},"3":{"name":"abs","line":10,"loc":{"start":{"line":10,"column":0},"end":{"line":10,"column":16}}}},"statementMap":{"1":{"start":{"line":2,"column":0},"end":{"line":4,"column":1}},"2":{"start":{"line":3,"column":2},"end":{"line":3,"column":14}},"3":{"start":{"line":6,"column":0},"end":{"line":8,"column":1}},"4":{"start":{"line":7,"column":2},"end":{"line":7,"column":14}},"5":{"start":{"line":10,"column":0},"end":{"line":15,"column":1}},"6":{"start":{"line":11,"column":2},"end":{"line":13,"column":3}},"7":{"start":{"line":12,"column":4},"end":{"line":12,"column":13}},"8":{"start":{"line":14,"column":2},"end":{"line":14,"column":10}},"9":{"start":{"line":16,"column":0},"end":{"line":16,"column":33}}},"branchMap":{"1":{"line":11,"type":"if","locations":[{"start":{"line":11,"column":2},"end":{"line":11,"column":2}},{"start":{"line":11,"column":2},"end":{"line":11,"column":2}}]}}};
}
__cov_ObzDDNDNs_OZn0nZzs6vsw = __cov_ObzDDNDNs_OZn0nZzs6vsw['/Users/gleb/git/real-time-coverage/examples/calc.js'];

console.log('coverage object with file information')
console.log(__cov_ObzDDNDNs_OZn0nZzs6vsw)
const fileCoverage = __cov_ObzDDNDNs_OZn0nZzs6vsw
console.log('statement coverage')
console.log(fileCoverage.s)
Object.keys(fileCoverage.s).forEach((statementIndex) => {
  var counter = fileCoverage.s[statementIndex]
  Object.defineProperty(fileCoverage.s, statementIndex, {
    enumerable: true,
    get: () => counter,
    set: (x) => {
      counter = x
    }
  })
})

function add(a,b){__cov_ObzDDNDNs_OZn0nZzs6vsw.f['1']++;__cov_ObzDDNDNs_OZn0nZzs6vsw.s['2']++;return a+b;}function sub(a,b){__cov_ObzDDNDNs_OZn0nZzs6vsw.f['2']++;__cov_ObzDDNDNs_OZn0nZzs6vsw.s['4']++;return a-b;}function abs(x){__cov_ObzDDNDNs_OZn0nZzs6vsw.f['3']++;__cov_ObzDDNDNs_OZn0nZzs6vsw.s['6']++;if(x<0){__cov_ObzDDNDNs_OZn0nZzs6vsw.b['1'][0]++;__cov_ObzDDNDNs_OZn0nZzs6vsw.s['7']++;return-x;}else{__cov_ObzDDNDNs_OZn0nZzs6vsw.b['1'][1]++;}__cov_ObzDDNDNs_OZn0nZzs6vsw.s['8']++;return x;}__cov_ObzDDNDNs_OZn0nZzs6vsw.s['9']++;console.log('2 + 3 =',add(2,3));

console.log('done')
console.log('statement coverage')
Object.keys(__cov_ObzDDNDNs_OZn0nZzs6vsw.s).forEach((k) => {
  console.log(k, __cov_ObzDDNDNs_OZn0nZzs6vsw.s[k])
})
