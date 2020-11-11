'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const leftMouseButtonDown = 0;

  const getMapActive = () => {
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

  const getDisablePages = () => {
    window.pin.pinsRemover();
    window.pin.cardRemover();
    map.classList.add(`map--faded`);
    window.validation.mainForm.classList.add(`ad-form--disabled`);
    window.move.getDefaultPinPosition();
    window.move.getAddress(window.move.pinHeightDisable);
    window.form.formTurnOff();
    window.move.mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
    window.move.mainPin.addEventListener(`keydown`, onMainPinKeyDown);
  };

  const activatePage = () => {
    window.validation.mainForm.classList.remove(`ad-form--disabled`);
    getMapActive();
    window.form.formTurnOn();
    window.move.getAddress(window.move.ACTIVE_PIN_HEIGHT);
    window.backend.load(window.filter.onDataLoad, window.backend.onError);
    window.validation.checkFormValidity();
    window.move.mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
    window.move.mainPin.removeEventListener(`keydown`, onMainPinKeyDown);
  };

  getDisablePages();

  window.main = {
    map,
    getDisablePages
  };
})();
