'use strict';

const MIN_Y = 130;
const MAX_Y = 630;
const MIN_X = 0;
const MAX_X = 1200;
const PIN_HEIGHT = 70;
const PIN_WIDTH = 50;
const AMOUNT_PINS = 8;
const CHEKIN_OPTIONS = [
  `12:00`,
  `13:00`,
  `14:00`
];
const CHEKOUT_OPTIONS = [
  `12:00`,
  `13:00`,
  `14:00`
];
const FEAUTURES_LIST = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
const PHOTOS_LIST = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const TYPES_LIST = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

document.querySelector(`.map`).classList.remove(`map--faded`);

const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)];
};

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

const getPin = (templateObject) => {
  const similarPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = `${templateObject.location.x - (PIN_WIDTH / 2)}px`;
  pinElement.style.top = `${templateObject.location.y - PIN_HEIGHT}px`;
  pinElement.querySelector(`img`).src = templateObject.author.avatar;
  pinElement.querySelector(`img`).alt = templateObject.offer.title;

  return pinElement;
};

const generatePins = (amount) => {
  const pinsList = [];

  for (let i = 1; i <= amount; i++) {

    pinsList.push({
      "author": {
        "avatar": `img/avatars/user0${i}.png`
      },
      "offer": {
        "title": `Уютная студия у метро`,
        "address": `${getRandomNumber(MIN_X, MAX_X)}, ${getRandomNumber(MIN_Y, MAX_Y)}`,
        "price": 10000,
        "type": getRandomElement(TYPES_LIST),
        "rooms": 1,
        "guests": 2,
        "checkin": getRandomElement(CHEKIN_OPTIONS),
        "checkout": getRandomElement(CHEKOUT_OPTIONS),
        "features": getRandomArray(FEAUTURES_LIST),
        "description": `Хорошая квартира-студия для комфортного проживания`,
        "photos": getRandomArray(PHOTOS_LIST)
      },
      "location": {
        "x": `${getRandomNumber(MIN_X, MAX_X)}`,
        "y": `${getRandomNumber(MIN_Y, MAX_Y)}`,
      }
    });
  }
  return pinsList;
};

const addPins = function (preparedPins) {
  const similarListPins = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();

  preparedPins.forEach(function (element) {
    fragment.appendChild(getPin(element));
  });

  similarListPins.appendChild(fragment);
};

const pins = generatePins(AMOUNT_PINS);
addPins(pins);
