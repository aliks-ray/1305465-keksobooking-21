'use strict';

const PIN_HEIGHT = 70;
const PIN_WIDTH = 50;
const PINS_MAX = 5;

const similarPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const similarListPins = document.querySelector(`.map__pins`);

const removeClassActivePin = () => {
  let activePin = document.querySelector(`.map__pin--active`);
  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }
};

const getPin = (templateObject) => {

  const pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = `${templateObject.location.x - (PIN_WIDTH / 2)}px`;
  pinElement.style.top = `${templateObject.location.y - PIN_HEIGHT}px`;
  pinElement.querySelector(`img`).src = templateObject.author.avatar;
  pinElement.querySelector(`img`).alt = templateObject.offer.title;

  pinElement.addEventListener(`click`, () => {
    removeClassActivePin();
    pinElement.classList.add(`map__pin--active`);
    window.card.create(templateObject);
  });

  pinElement.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      window.card.create(templateObject);
    }
  });

  return pinElement;
};

const addPins = (preparedPins) => {
  window.pin.cardRemover();
  window.pin.pinsRemover();
  const fragment = document.createDocumentFragment();

  preparedPins.forEach((element) => {
    fragment.appendChild(getPin(element));
  });

  similarListPins.appendChild(fragment);
};

const pinsRemover = () => {
  const pinsItems = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pinsItems.forEach((pinItem) =>
    pinItem.remove());
};

const cardRemover = () => {
  const mapCard = document.querySelector(`.map__card`);
  if (mapCard) {
    window.card.remove();
  }
};

window.pin = {
  addPins,
  removeClassActivePin,
  pinsRemover,
  cardRemover,
  PINS_MAX
};
