function generateNumber(from, to) {
  if (from >= to) {
    const tmp = from;
    from = to;
    to = tmp;
  }
  return Math.round(from + Math.random() * (to - from));
}

generateNumber(10, 1);


function checkLenght(string, maxLength) {
  return string.length <= maxLength;
}

checkLenght('abababab', 5);
