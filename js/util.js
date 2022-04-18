const generateNumber = (from, to) => {
  if (from >= to) {
    const tmp = from;
    from = to;
    to = tmp;
  }
  return Math.round(from + Math.random() * (to - from));
};

const generateRandomList = (number) => {
  const list = [];
  for (let i = 1; i <= number; i++) {
    list.push(i);
  }
  for (let i = 0; i < number; i++) {
    const j = generateNumber(0, number-1);
    const tmp = list[i];
    list[i] = list[j];
    list[j] = tmp;
  }
  return list;
};


const checkLenght = (string, maxLength) => string.length <= maxLength;

const min = (a, b) => {
  if (a < b) {return a;}
  return b;
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {generateNumber, generateRandomList, checkLenght, min, debounce, throttle};
