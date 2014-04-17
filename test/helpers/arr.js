function range(a, b) {
  // > range(2,5)
  // [2, 3, 4]
  if (b === undefined) {
    b = a;
    a = 0;
  }
  return a === b ? [] : range(a, b - 1).concat(b - 1);
}

// Make 4 testscases of arrays which must be combined.
function makeArrays(i) {
  return [
    range(2, 3).map(function () {
      return range(80, 90);
    }),
    range(8, 10).map(function () {
      return range(50, 80);
    }),
    range(40, 45).map(function () {
      return range(0, 80);
    }),
    range(1000, 1100).map(function () {
      return range(0, 5);
    })
  ];
}

var tests = range(3).map(makeArrays);

tests.map(function (arrays) {
  return [].concat.apply([], arrays);
});

