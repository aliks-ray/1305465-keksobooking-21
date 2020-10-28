'use strict';
(() => {
  const roomGuestRation = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  const roomNumberSelect = document.querySelector(`#room_number`);
  const capacitySelect = document.querySelector(`#capacity`);
  const mainForm = document.querySelector(`.ad-form`);
  const fieldsets = document.getElementsByTagName(`fieldset`);

  const formTurnOff = () => {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
  };

  const formTurnOn = function formTurnOn() {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  };

  const checkPlaceValidity = () => {
    const roomGuests = roomGuestRation[roomNumberSelect.value];
    const message = roomGuests.indexOf(+capacitySelect.value) === -1 ? `Столько гостей не сможет разместиться, предложите больше комнат` : ``;
    capacitySelect.setCustomValidity(message);
  };

  const disableCapacityOptions = (inputValue) => {
    const capacityOptions = capacitySelect.querySelectorAll(`option`);
    capacityOptions.forEach(function (it) {
      it.disabled = true;
    });
    roomGuestRation[inputValue].forEach(function (it) {
      capacitySelect.querySelector(`option` + `[value="` + it + `"]`).disabled = false;
      capacitySelect.value = it;
    });
  };

  const onRoomNumberSelectChange = (evt) => {
    evt.target.setCustomValidity(``);
    disableCapacityOptions(roomNumberSelect.value);
    checkPlaceValidity();
  };

  roomNumberSelect.addEventListener(`change`, onRoomNumberSelectChange);

  window.form = {
    mainForm,
    formTurnOff,
    formTurnOn,
    disableCapacityOptions,
    capacitySelect
  };
})();
