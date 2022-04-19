const generateNumber = (from, to) => {
  if (from >= to) {
    const tmp = from;
    from = to;
    to = tmp;
  }
  return Math.round(from + Math.random() * (to - from));
};

const generateRandomList = (number) => {
  const randomNumbers = [];
  for (let i = 1; i <= number; i++) {
    randomNumbers.push(i);
  }
  for (let i = 0; i < number; i++) {
    const j = generateNumber(0, number-1);
    const tmp = randomNumbers[i];
    randomNumbers[i] = randomNumbers[j];
    randomNumbers[j] = tmp;
  }
  return randomNumbers;
};


const getMin = (a, b) => {
  if (a < b) {return a;}
  return b;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {generateNumber, generateRandomList, getMin, debounce};
