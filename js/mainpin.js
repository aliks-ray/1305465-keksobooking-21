'use strict';
(() => {
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 62;
  const pinHeightDisable = MAIN_PIN_HEIGHT / 2;
  const ACTIVE_PIN_HEIGTH = 84;

  const mainPin = document.querySelector(`.map__pin--main`);
  const addressData = document.querySelector(`#address`);

  addressData.setAttribute(`readonly`, true);

  const getAddress = (pinHeight) => {
    addressData.value = Math.floor(parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2) + `, ` + Math.floor((parseInt(mainPin.style.top, 10) + pinHeight));
  };

  getAddress();

  const Borders = {
    TOP: 130,
    BOTTOM: 630,
    LEFT: 0,
    RIGHT: 1200,
  };

  const limits = {
    top: Math.floor(Borders.TOP - ACTIVE_PIN_HEIGTH),
    bottom: Math.floor(Borders.BOTTOM - ACTIVE_PIN_HEIGTH),
    left: Math.floor(Borders.LEFT - MAIN_PIN_WIDTH / 2),
    right: Math.floor(Borders.RIGHT - MAIN_PIN_WIDTH / 2),
  };

  const moveMainPin = (targetElement, drivenElement) => {
    const onTargetElementMouseMove = (evt) => {
      evt.preventDefault();

      let startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {

        moveEvt.preventDefault();

        let shift = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY
        };

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (parseInt(drivenElement.style.top, 10) > limits.bottom) {
          drivenElement.style.top = `${limits.bottom}px`;
        } else if (parseInt(drivenElement.style.top, 10) < limits.top) {
          drivenElement.style.top = `${limits.top}px`;
        } else {
          drivenElement.style.top = `${drivenElement.offsetTop - shift.y}px`;
        }

        if (parseInt(drivenElement.style.left, 10) > limits.right) {
          drivenElement.style.left = `${limits.right}px`;
        } else if (parseInt(drivenElement.style.left, 10) < limits.left) {
          drivenElement.style.left = `${limits.left}px`;
        } else {
          drivenElement.style.left = `${drivenElement.offsetLeft - shift.x}px`;
        }

        getAddress(ACTIVE_PIN_HEIGTH);
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    };

    targetElement.addEventListener(`mousedown`, onTargetElementMouseMove);
  };

  moveMainPin(mainPin, mainPin);

  window.mainpin = {
    getAddress,
    mainPin,
    pinHeightDisable,
    moveMainPin
  };
})();
