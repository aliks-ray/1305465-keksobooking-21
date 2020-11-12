'use strict';

const MIN_Y = 130;
const MAX_Y = 630;
const MIN_X = 0;
const MAX_X = 1200;
const AMOUNT_PINS = 10;
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

const getBookingItems = (amount) => {
  const pinsList = [];

  for (let i = 1; i <= amount; i++) {
    const locationX = window.util.getRandomNumber(MIN_X, MAX_X);
    const locationY = window.util.getRandomNumber(MIN_Y, MAX_Y);

    pinsList.push({
      "author": {
        "avatar": `img/avatars/user0${i}.png`
      },
      "offer": {
        "title": window.util.getRandomElement(OFFER_TITLES),
        "address": `${locationX}, ${locationY}`,
        "price": `${window.util.getRandomNumber(offerPrice.MIN, offerPrice.MAX)}`,
        "type": window.util.getRandomProperty(offerTypes),
        "rooms": window.util.getRandomElement(OFFER_ROOMS),
        "guests": window.util.getRandomElement(OFFER_GUESTS),
        "checkin": window.util.getRandomElement(CHEKIN_OPTIONS),
        "checkout": window.util.getRandomElement(CHEKOUT_OPTIONS),
        "features": window.util.getRandomArray(OFFER_FEAUTURES),
        "description": window.util.getRandomElement(OFFER_DESCRIPTIONS),
        "photos": window.util.getRandomArray(OFFER_PHOTOS)
      },
      "location": {
        "x": `${locationX}`,
        "y": `${locationY}`,
      }
    });
  }
  return pinsList;
};

const pins = getBookingItems(AMOUNT_PINS);

window.data = {
  pins,
  offerTypes
};
