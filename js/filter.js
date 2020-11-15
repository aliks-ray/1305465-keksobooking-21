'use strict';

const MAX_PIN_AMOUNT = 5;
const FILTER_ALL = `any`;

let data = [];

const filtersForm = document.querySelector(`.map__filters`);
const houseType = filtersForm.querySelector(`#housing-type`);
const housePrice = filtersForm.querySelector(`#housing-price`);
const houseRooms = filtersForm.querySelector(`#housing-rooms`);
const houseGuests = filtersForm.querySelector(`#housing-guests`);
const houseFeatures = filtersForm.querySelectorAll(`.map__checkbox`);

const housePriceMap = {
  middle: {
    min: 10000,
    max: 50000
  },
  low: {
    max: 10000
  },
  high: {
    min: 50000,
  }
};

const filterHouseType = (item) => {
  const houseFilter = houseType.value;
  let houseFilterResult = false;

  if (item.offer.type === houseFilter || houseFilter === FILTER_ALL) {
    houseFilterResult = true;
  }

  return houseFilterResult;
};

const filterHousePrice = (item) => {
  const priceFilter = housePrice.value;
  let priceFilterResult = false;

  switch (priceFilter) {
    case FILTER_ALL:
      priceFilterResult = true;
      break;

    case `middle`:
      if (item.offer.price >= housePriceMap.middle.min && item.offer.price <= housePriceMap.middle.max) {
        priceFilterResult = true;
      }
      break;

    case `low`:
      if (item.offer.price < housePriceMap.low.max) {
        priceFilterResult = true;
      }
      break;

    case `high`:
      if (item.offer.price > housePriceMap.high.min) {
        priceFilterResult = true;
      }
      break;
  }

  return priceFilterResult;
};

const filterHouseRooms = (item) => {
  const roomsFilter = houseRooms.value;
  let roomsFilterResult = false;

  if (item.offer.rooms === parseInt(roomsFilter, 10) || roomsFilter === FILTER_ALL) {
    roomsFilterResult = true;
  }

  return roomsFilterResult;
};

const filterHouseGuests = (item) => {
  const guestsFilter = houseGuests.value;
  let guestsFilterResult = false;

  if (item.offer.guests === parseInt(guestsFilter, 10) || guestsFilter === FILTER_ALL) {
    guestsFilterResult = true;
  }

  return guestsFilterResult;
};

const filterHouseFeatures = (item) => {
  const checkedFeatures = Array.from(filtersForm.querySelectorAll(`.map__checkbox:checked`));

  return checkedFeatures.every((feature) => {
    return item.offer.features.includes(feature.value);
  });
};

const filterData = (offers) => {
  const filteredData = [];

  for (let i = 0; i < offers.length && filteredData.length < MAX_PIN_AMOUNT; i++) {

    if (filterHouseType(offers[i]) &&
    filterHousePrice(offers[i]) &&
    filterHouseRooms(offers[i]) &&
    filterHouseGuests(offers[i]) &&
    filterHouseFeatures(offers[i])) {
      filteredData.push(offers[i]);
    }
  }

  return filteredData;
};

const onFiltersFormChange = () => {
  window.pin.addPins(filterData(data));
};

filtersForm.addEventListener(`change`, window.util.debounce(onFiltersFormChange));

const onDataLoad = (response) => {
  data = response;
  const filteredData = filterData(data);
  window.pin.addPins(filteredData, window.pin.PINS_MAX);
};

const filterReset = () => {
  houseType.value = FILTER_ALL;
  housePrice.value = FILTER_ALL;
  houseRooms.value = FILTER_ALL;
  houseGuests.value = FILTER_ALL;
  houseFeatures.forEach((element)=> {
    element.checked = false;
  });
};

window.filter = {
  onDataLoad,
  reset: filterReset
};
