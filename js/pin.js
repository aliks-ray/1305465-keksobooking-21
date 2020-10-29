'use strict';
(() => {
  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 50;

  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 62;
  const pinHeightDisable = MAIN_PIN_HEIGHT / 2;
  const pinHeightActive = 84;

  const similarPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const similarListPins = document.querySelector(`.map__pins`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const addressData = document.querySelector(`#address`);

  const removeClassActivePin = function () {
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

    pinElement.addEventListener(`click`, function () {
      removeClassActivePin();
      pinElement.classList.add(`map__pin--active`);
      window.card.createCard(templateObject);
    });

    pinElement.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        window.card.createCard(templateObject);
      }
    });

    return pinElement;
  };

  const addPins = (preparedPins) => {
    const fragment = document.createDocumentFragment();

    preparedPins.forEach(function (element) {
      fragment.appendChild(getPin(element));
    });

    similarListPins.appendChild(fragment);
  };

  addressData.setAttribute(`readonly`, true);

  const getAddress = (pinHeight) => {
    addressData.value = Math.floor(parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2) + `, ` + Math.floor((parseInt(mainPin.style.top, 10) + pinHeight));
  };

  getAddress();

  window.pin = {
    addPins,
    getAddress,
    mainPin,
    pinHeightActive,
    pinHeightDisable,
    removeClassActivePin
  };
})();
