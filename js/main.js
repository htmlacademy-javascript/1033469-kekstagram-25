function generateNumber(from, to) {
  if (from <= to) {
    return Math.round(from + Math.random() * (to - from));
  }
  return 'Недопустимые границы диапазона';
}

generateNumber(10, 1);


function checkLenght(string, maxLength) {
  return string.length <= maxLength;
}

checkLenght('abababab', 5);
