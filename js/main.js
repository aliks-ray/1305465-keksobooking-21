'use strict';

// Объявление констант

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
const OFFER_FEAUTURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
const OFFER_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const offerTypes = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const OFFER_TITLES = [
  `Квартира в центре`,
  `Современные апартаменты`,
  `Уютная студия`,
  `Видовая квартира`,
  `Собственный дом`];
const OFFER_DESCRIPTIONS = [
  `Комфортное жилье недалеко от метро и транспортных развязок`,
  `Небольшая площадь компенсируется уютом и красивыми окрестностями`,
  `Захватывающий вид на телебашню, есть вся необходимая бытовая техника`
];
const offerPrice = {
  MIN: 1000,
  MAX: 1000000
};
const OFFER_ROOMS = [
  1,
  2,
  3,
  100
];
const OFFER_GUESTS = [
  1,
  2,
  3,
  `не для гостей`
];

const map = document.querySelector(`.map`);
const similarPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const similarListPins = document.querySelector(`.map__pins`);
const similarCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

// Делаем карту активной

map.classList.remove(`map--faded`);

// Функция для получения рандомного числа

const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// Функция для получения рандомного элемента массива

const getRandomElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)];
};

// Функция для получения рандомного свойства из массива

function getRandomProperty(obj) {
  const keys = Object.keys(obj);
  return obj[keys[getRandomNumber(0, keys.length)]];
}

// Функция для получения рандомной части массива из нескольких элементов

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

// Функция для создания пинов объявлений

const getPin = (templateObject) => {

  const pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = `${templateObject.location.x - (PIN_WIDTH / 2)}px`;
  pinElement.style.top = `${templateObject.location.y - PIN_HEIGHT}px`;
  pinElement.querySelector(`img`).src = templateObject.author.avatar;
  pinElement.querySelector(`img`).alt = templateObject.offer.title;

  return pinElement;
};

// Функция для генерирования объявлений

const getBookingItems = (amount) => {
  const pinsList = [];

  for (let i = 1; i <= amount; i++) {
    const locationX = getRandomNumber(MIN_X, MAX_X);
    const locationY = getRandomNumber(MIN_Y, MAX_Y);

    pinsList.push({
      "author": {
        "avatar": `img/avatars/user0${i}.png`
      },
      "offer": {
        "title": getRandomElement(OFFER_TITLES),
        "address": `${locationX}, ${locationY}`,
        "price": `${getRandomNumber(offerPrice.MIN, offerPrice.MAX)}`,
        "type": getRandomProperty(offerTypes),
        "rooms": getRandomElement(OFFER_ROOMS),
        "guests": getRandomElement(OFFER_GUESTS),
        "checkin": getRandomElement(CHEKIN_OPTIONS),
        "checkout": getRandomElement(CHEKOUT_OPTIONS),
        "features": getRandomArray(OFFER_FEAUTURES),
        "description": getRandomElement(OFFER_DESCRIPTIONS),
        "photos": getRandomArray(OFFER_PHOTOS)
      },
      "location": {
        "x": `${locationX}`,
        "y": `${locationY}`,
      }
    });
  }
  return pinsList;
};

// Функция для склонения слов

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

// Функция для создания карточек объявлений

const renderCard = (bookingItem) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  const featureElement = cardElement.querySelector(`.popup__features`);
  const photoElement = cardElement.querySelector(`.popup__photos`);

  cardElement.querySelector(`.popup__title`).textContent = `${bookingItem.offer.title}`;
  cardElement.querySelector(`.popup__text--address`).textContent = `${bookingItem.offer.address}`;
  cardElement.querySelector(`.popup__text--price`).textContent = `${bookingItem.offer.price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = `${bookingItem.offer.type}`;
  cardElement.querySelector(`.popup__text--capacity`).textContent =
    `${bookingItem.offer.rooms}
    ${getNoun(bookingItem.offer.rooms, `комната`, `комнаты`, `комнат`)}
    ${bookingItem.offer.guests > 0 ? `для ${bookingItem.offer.guests}
    ${getNoun(bookingItem.offer.guests, `гостя`, `гостей`, `гостей`)}` : `не для гостей`}`;
  cardElement.querySelector(`.popup__text--time`).textContent =
    `Заезд после ${bookingItem.offer.checkin},
    выезд до ${bookingItem.offer.checkout}`;

  // Создание преимуществ в карточке объявления

  while (featureElement.firstChild) {
    featureElement.removeChild(featureElement.firstChild);
  }
  for (let i = 0; i < bookingItem.offer.features.length; i++) {
    cardElement.querySelector(`.popup__features`).appendChild(document.createElement(`li`))
    .classList.add(`popup__feature`, `popup__feature--${bookingItem.offer.features[i]}`);
  }

  cardElement.querySelector(`.popup__description`).textContent = `${bookingItem.offer.description}`;

  while (photoElement.firstChild) {
    photoElement.removeChild(photoElement.firstChild);
  }

  // Создание фотографий в карточке объявления

  for (let i = 0; i < bookingItem.offer.photos.length; i++) {
    const img = document.createElement(`img`);
    img.src = `${bookingItem.offer.photos[i]}`;
    img.alt = `Фото квартиры`;
    img.width = 45;
    img.height = 40;
    cardElement.querySelector(`.popup__photos`).appendChild(img).classList.add(`popup__photo`);
  }

  cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, `${bookingItem.author.avatar}`);

  return cardElement;
};

// Функция для отрисовки пинов

const addPins = (preparedPins) => {
  const fragment = document.createDocumentFragment();

  preparedPins.forEach(function (element) {
    fragment.appendChild(getPin(element));
  });

  similarListPins.appendChild(fragment);
};

// Функция для отрисовки объявления

const pins = getBookingItems(AMOUNT_PINS);
addPins(pins);

const addCards = (preparedPins) => {

  preparedPins.forEach(function (element) {
    map.appendChild(renderCard(element));
  });
};

addCards(pins);
