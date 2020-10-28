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
    window.pin.getAddress(window.pin.pinHeightDisable);
    window.form.formTurnOff();
    window.pin.mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
    window.pin.mainPin.addEventListener(`keydown`, onMainPinKeyDown);
  };

  const activatePage = () => {
    window.validation.mainForm.classList.remove(`ad-form--disabled`);
    window.pin.getAddress(window.pin.pinHeightActive);
    getMapActive();
    window.form.formTurnOn();
    window.pin.addPins(window.data.pins);
    window.validation.checkFormValidity();
    window.pin.mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
    window.pin.mainPin.removeEventListener(`keydown`, onMainPinKeyDown);
  };

  getDisablePages();

  window.main = {
    map
  };
})();
