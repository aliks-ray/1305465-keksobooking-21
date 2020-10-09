'use strict';

const MIN_Y = 130;
const MAX_Y = 630;
const MIN_X = 0;
const MAX_X = 1200;
const PIN_HEIGHT = 70;
const PIN_WIDTH = 50;
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
const OFFER_TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];
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

const similarPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const similarListPins = document.querySelector(`.map__pins`);
const similarCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

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

  const pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = `${templateObject.location.x - (PIN_WIDTH / 2)}px`;
  pinElement.style.top = `${templateObject.location.y - PIN_HEIGHT}px`;
  pinElement.querySelector(`img`).src = templateObject.author.avatar;
  pinElement.querySelector(`img`).alt = templateObject.offer.title;

  return pinElement;
};

const getBookingItem = () => {
  return {
    "author": {
      "avatar": `img/avatars/user0${getRandomNumber(1, 8)}.png`
    },
    "offer": {
      "title": getRandomElement(OFFER_TITLES),
      "address": `${getRandomNumber(MIN_X, MAX_X)}, ${getRandomNumber(MIN_Y, MAX_Y)}`,
      "price": `${getRandomNumber(1000, 20000)}`,
      "type": getRandomElement(OFFER_TYPES),
      "rooms": getRandomNumber(1, 3),
      "guests": getRandomNumber(1, 12),
      "checkin": getRandomElement(CHEKIN_OPTIONS),
      "checkout": getRandomElement(CHEKOUT_OPTIONS),
      "features": getRandomArray(OFFER_FEAUTURES),
      "description": getRandomElement(OFFER_DESCRIPTIONS),
      "photos": getRandomArray(OFFER_PHOTOS)
    },
    "location": {
      "x": `${getRandomNumber(MIN_X, MAX_X)}`,
      "y": `${getRandomNumber(MIN_Y, MAX_Y)}`,
    }
  };
};

const booking = [];

for (let i = 0; i < 8; i++) {
  const bookingItem = getBookingItem(i);
  booking.push(bookingItem);
}

const OfferType = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const addDeclension = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const renderCard = (bookingItem) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  const featureElement = cardElement.querySelector(`.popup__features`);
  const photoElement = cardElement.querySelector(`.popup__photos`);

  cardElement.querySelector(`.popup__title`).textContent = `${bookingItem.offer.title}`;
  cardElement.querySelector(`.popup__text--address`).textContent = `${bookingItem.offer.address}`;
  cardElement.querySelector(`.popup__text--price`).textContent = `${bookingItem.offer.price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = OfferType[`${bookingItem.offer.type}`];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${bookingItem.offer.rooms} ${addDeclension(bookingItem.offer.rooms, [`комната`, `комнаты`, `комнат`])} ${bookingItem.offer.guests > 0 ? `для ${bookingItem.offer.guests} ${addDeclension(bookingItem.offer.guests, [`гостя`, `гостей`, `гостей`])}` : `не для гостей`}`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${bookingItem.offer.checkin}, выезд до ${bookingItem.offer.checkout}`;

  while (featureElement.firstChild) {
    featureElement.removeChild(featureElement.firstChild);
  }
  for (let i = 0; i < bookingItem.offer.features.length; i++) {
    cardElement.querySelector(`.popup__features`).appendChild(document.createElement(`li`)).classList.add(`popup__feature`, `popup__feature--${bookingItem.offer.features[i]}`);
  }

  cardElement.querySelector(`.popup__description`).textContent = `${bookingItem.offer.description}`;

  while (photoElement.firstChild) {
    photoElement.removeChild(photoElement.firstChild);
  }

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

const fragment = document.createDocumentFragment();

for (let i = 0; i < 8; i++) {
  fragment.appendChild(getPin(booking[i]));
}

fragment.appendChild(renderCard(booking[0]));

similarListPins.appendChild(fragment);
