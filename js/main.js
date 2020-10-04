'use strict';

const MIN_Y = 130;
const MAX_Y = 630;
const MIN_X = 0;
const MAX_X = 1200;
const PIN_HEIGHT = 70;
const PIN_WIDTH = 50;
const AMOUNT_PINS = 8;
const checkinOptions = [
  `12:00`,
  `13:00`,
  `14:00`
];
const checkoutOptions = [
  `12:00`,
  `13:00`,
  `14:00`
];
const featuresList = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
const photosList = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const typesList = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

document.querySelector(`.map`).classList.remove(`map--faded`);

const getRandomNumber = function (min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

const getRandomArray = function (primaryElements) {
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

const getPin = function (templateObject) {
  const similarPinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

  const pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = templateObject.location.x - (PIN_WIDTH / 2) + `px`;
  pinElement.style.top = templateObject.location.y - PIN_HEIGHT + `px`;
  pinElement.querySelector(`img`).src = templateObject.author.avatar;
  pinElement.querySelector(`img`).alt = templateObject.offer.title;

  return pinElement;
};

const generatePins = function (amount) {
  const pinsList = [];

  for (let i = 1; i <= amount; i++) {
    const x = getRandomNumber(MIN_X, MAX_X);
    const y = getRandomNumber(MIN_Y, MAX_Y);

    pinsList.push({
      "author": {
        "avatar": `img/avatars/user0` + i + `.png`
      },
      "offer": {
        "title": `Уютная студия у метро`,
        "address": x + `,` + y,
        "price": 10000,
        "type": getRandomElement(typesList),
        "rooms": 1,
        "guests": 2,
        "checkin": getRandomElement(checkinOptions),
        "checkout": getRandomElement(checkoutOptions),
        "features": getRandomArray(featuresList),
        "description": `Хорошая квартира-студия для комфортного проживания`,
        "photos": getRandomArray(photosList)
      },
      "location": {
        "x": x,
        "y": y
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
