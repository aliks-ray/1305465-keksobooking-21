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
    window.pin.addPins(window.data.pins);
    window.validation.checkFormValidity();
    window.move.mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
    window.move.mainPin.removeEventListener(`keydown`, onMainPinKeyDown);
  };

  getDisablePages();

  window.main = {
    map
  };
})();
