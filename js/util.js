'use strict';

const DEBOUNCE_INTERVAL = 500;

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
  let lastTimeout = false;
  return function (evt) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(cb.bind(null, evt), DEBOUNCE_INTERVAL);
  };
}

window.util = {
  getNoun,
  debounce
};
