'use strict';

const mainPin = document.querySelector(`.map__pin--main`);
const addressData = document.querySelector(`#address`);

const MAIN_PIN_WIDTH = 62;
const MAIN_PIN_HEIGHT = 62;
const pinHeightDisable = MAIN_PIN_HEIGHT / 2;
const ACTIVE_PIN_HEIGHT = 84;
const defaultPinX = mainPin.style.left;
const defaultPinY = mainPin.style.top;

const Borders = {
  TOP: 130,
  BOTTOM: 630,
  LEFT: 0,
  RIGHT: 1200,
};

const limits = {
  top: Math.floor(Borders.TOP - ACTIVE_PIN_HEIGHT),
  bottom: Math.floor(Borders.BOTTOM - ACTIVE_PIN_HEIGHT),
  left: Math.floor(Borders.LEFT - MAIN_PIN_WIDTH / 2),
  right: Math.floor(Borders.RIGHT - MAIN_PIN_WIDTH / 2),
};

const setAddress = (pinHeight) => {
  addressData.value = Math.floor(parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2) + `, ` + Math.floor((parseInt(mainPin.style.top, 10) + pinHeight));
};

setAddress();

let getDefaultPinPosition = () => {
  mainPin.style.left = defaultPinX;
  mainPin.style.top = defaultPinY;
};

const moveMainPin = (targetElement, drivenElement) => {
  const onTargetElementMouseMove = (evt) => {
    evt.preventDefault();

    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let newPositionY = drivenElement.style.top = (drivenElement.offsetTop - shift.y);
      let newPositionX = drivenElement.style.left = (drivenElement.offsetLeft - shift.x);

      if (newPositionY >= (limits.bottom)) {
        newPositionY = limits.bottom;
      } else if (newPositionY <= limits.top) {
        newPositionY = limits.top;
      }

      if (newPositionX <= (limits.left)) {
        newPositionX = limits.left;
      } else if (newPositionX > limits.right) {
        newPositionX = limits.right;
      }

      drivenElement.style.top = newPositionY + `px`;
      drivenElement.style.left = newPositionX + `px`;

      setAddress(ACTIVE_PIN_HEIGHT);
    };

    const onMouseUp = (upEvt) => {
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

window.move = {
  setAddress,
  mainPin,
  pinHeightDisable,
  ACTIVE_PIN_HEIGHT,
  getDefaultPinPosition
};
