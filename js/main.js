'use strict';

const map = document.querySelector(`.map`);
const leftMouseButtonDown = 0;

const activateMap = () => {
  map.classList.remove(`map--faded`);
};

const onMainPinMouseDown = (evt) => {
  if (evt.button === leftMouseButtonDown) {
    activatePage();
  }
};

const onMainPinKeyDown = (evt) => {
  if (evt.key === `Enter`) {
    activatePage();
  }
};

const disactivatePage = () => {
  window.pin.removePins();
  window.pin.removeCards();
  window.filter.reset();
  window.prewiew.clear();
  map.classList.add(`map--faded`);
  window.validation.mainForm.classList.add(`ad-form--disabled`);
  window.move.getDefaultPinPosition();
  window.move.setAddress(window.move.pinHeightDisable);
  window.form.turnOff();
  window.move.mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  window.move.mainPin.addEventListener(`keydown`, onMainPinKeyDown);
};

const activatePage = () => {
  window.validation.mainForm.classList.remove(`ad-form--disabled`);
  activateMap();
  window.form.turnOn();
  window.move.setAddress(window.move.ACTIVE_PIN_HEIGHT);
  window.backend.load(window.filter.onDataLoad, window.backend.onError);
  window.validation.checkFormValidity();
  window.move.mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
  window.move.mainPin.removeEventListener(`keydown`, onMainPinKeyDown);
};

disactivatePage();

window.main = {
  map,
  disactivatePage
};
