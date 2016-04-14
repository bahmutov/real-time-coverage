// example program to be instrumented
function add(a, b) {
  return a + b
}

function sub(a, b) {
  return a - b
}

function abs(x) {
  if (x < 0) {
    return -x
  }
  return x
}
console.log('2 + 3 =', add(2, 3))
