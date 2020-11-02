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
    window.mainpin.getAddress(window.mainpin.pinHeightDisable);
    window.form.formTurnOff();
    window.mainpin.mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
    window.mainpin.mainPin.addEventListener(`keydown`, onMainPinKeyDown);
  };

  const activatePage = () => {

    window.validation.mainForm.classList.remove(`ad-form--disabled`);
    getMapActive();
    window.form.formTurnOn();
    window.pin.addPins(window.data.pins);
    window.validation.checkFormValidity();
    window.mainpin.mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
    window.mainpin.mainPin.removeEventListener(`keydown`, onMainPinKeyDown);
  };

  getDisablePages();

  window.main = {
    map
  };
})();
