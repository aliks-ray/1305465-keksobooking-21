'use strict';

const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)];
};

function getRandomProperty(obj) {
  const keys = Object.keys(obj);
  return obj[keys[getRandomNumber(0, keys.length)]];
}

const getRandomArray = (primaryElements) => {
  const copyElements = primaryElements.slice();
  let j;
  let temp;
  for (let i = copyElements.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = copyElements[i];
    copyElements[i] = copyElements[j];
    copyElements[j] = temp;
  }
  return copyElements.slice(getRandomNumber(0, copyElements.length));
};

function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

function debounce(cb) {
  const DEBOUNCE_INTERVAL = 500;
  let lastTimeout = false;
  return function (evt) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(cb.bind(null, evt), DEBOUNCE_INTERVAL);
  };
}

window.util = {
  getRandomNumber,
  getRandomElement,
  getRandomProperty,
  getRandomArray,
  getNoun,
  debounce
};
