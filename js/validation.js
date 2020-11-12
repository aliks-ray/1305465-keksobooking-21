'use strict';

const roomGuestRation = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const typesAndPricesDependence = {
  flat: `1000`,
  bungalow: `0`,
  house: `5000`,
  palace: `10000`
};

const mainForm = document.querySelector(`.ad-form`);
const roomNumberSelect = mainForm.querySelector(`#room_number`);
const capacitySelect = mainForm.querySelector(`#capacity`);
const offerPriceInput = mainForm.querySelector(`#price`);
const offerTypeSelect = mainForm.querySelector(`#type`);
const offerTimeInSelect = mainForm.querySelector(`#timein`);
const offerTimeOutSelect = mainForm.querySelector(`#timeout`);

const setMinPrice = () => {
  const minPrice = typesAndPricesDependence[offerTypeSelect.options[offerTypeSelect.selectedIndex].value];
  offerPriceInput.placeholder = minPrice;
  offerPriceInput.setAttribute(`min`, minPrice);
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

const onOfferTypeSelectChange = (evt) => {
  evt.target.setCustomValidity(``);
  setMinPrice(offerPriceInput.value);
  checkPlaceValidity();
};

const onRoomNumberSelectChange = (evt) => {
  evt.target.setCustomValidity(``);
  disableCapacityOptions(roomNumberSelect.value);
  checkPlaceValidity();
};

offerTimeInSelect.addEventListener(`change`, function () {
  offerTimeOutSelect.value = offerTimeInSelect.value;
});

offerTimeOutSelect.addEventListener(`change`, function () {
  offerTimeInSelect.value = offerTimeOutSelect.value;
});

roomNumberSelect.addEventListener(`change`, onRoomNumberSelectChange);
offerTypeSelect.addEventListener(`change`, onOfferTypeSelectChange);

const checkFormValidity = () => {
  disableCapacityOptions(roomNumberSelect.value);
  disableCapacityOptions(capacitySelect.value);
  setMinPrice();
};

window.validation = {
  mainForm,
  checkFormValidity
};
