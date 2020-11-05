'use strict';
(() => {
  const PHOTO_WIDTH = 45;
  const PHOTO_HEIGHT = 40;

  const similarCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const beforeThisBlock = document.querySelector(`.map__filters-container`);
  let cardElement;

  const removeCard = function () {
    if (cardElement) {
      cardElement.remove();
    }
  };

  const createCard = (bookingItem) => {
    removeCard();

    cardElement = similarCardTemplate.cloneNode(true);
    const featureElement = cardElement.querySelector(`.popup__features`);
    const photoElement = cardElement.querySelector(`.popup__photos`);
    const popupCloseButton = cardElement.querySelector(`.popup__close`);

    const cardTitle = cardElement.querySelector(`.popup__title`);
    const cardAddress = cardElement.querySelector(`.popup__text--address`);
    const cardPrice = cardElement.querySelector(`.popup__text--price`);
    const cardType = cardElement.querySelector(`.popup__type`);
    const cardCapacity = cardElement.querySelector(`.popup__text--capacity`);
    const cardTime = cardElement.querySelector(`.popup__text--time`);
    const cardDescription = cardElement.querySelector(`.popup__description`);
    const cardAvatar = cardElement.querySelector(`.popup__avatar`);

    cardTitle.textContent = bookingItem.offer.title;
    cardAddress.textContent = bookingItem.offer.address;
    cardPrice.textContent = `${bookingItem.offer.price} ₽/ночь`;
    cardType.textContent = window.data.offerTypes[bookingItem.offer.type];
    cardCapacity.textContent =
      `${bookingItem.offer.rooms}
      ${window.util.getNoun(bookingItem.offer.rooms, `комната`, `комнаты`, `комнат`)}
      ${bookingItem.offer.guests > 0 ? `для ${bookingItem.offer.guests}
      ${window.util.getNoun(bookingItem.offer.guests, `гостя`, `гостей`, `гостей`)}` : `не для гостей`}`;
    cardTime.textContent =
      `Заезд после ${bookingItem.offer.checkin},
      выезд до ${bookingItem.offer.checkout}`;
    cardDescription.textContent = bookingItem.offer.description;
    cardAvatar.setAttribute(`src`, `${bookingItem.author.avatar}`);


    while (featureElement.firstChild) {
      featureElement.removeChild(featureElement.firstChild);
    }
    for (let i = 0; i < bookingItem.offer.features.length; i++) {
      featureElement.appendChild(document.createElement(`li`))
        .classList.add(`popup__feature`, `popup__feature--${bookingItem.offer.features[i]}`);
    }

    while (photoElement.firstChild) {
      photoElement.removeChild(photoElement.firstChild);
    }

    for (let i = 0; i < bookingItem.offer.photos.length; i++) {
      const img = document.createElement(`img`);
      img.src = `${bookingItem.offer.photos[i]}`;
      img.alt = `Фото квартиры`;
      img.width = PHOTO_WIDTH;
      img.height = PHOTO_HEIGHT;
      photoElement.appendChild(img).classList.add(`popup__photo`);
    }

    const onCardCloseButtonClick = function () {
      removeCard();
      window.pin.removeClassActivePin();
      popupCloseButton.removeEventListener(`click`, onCardCloseButtonClick);
      document.removeEventListener(`keydown`, onCardEscapePress);
    };

    const onCardCloseButtonEnterPress = function (evt) {
      if (evt.key === `Enter`) {
        removeCard();
        window.pin.removeClassActivePin();
      }
    };

    const onCardEscapePress = function (evt) {
      if (evt.key === `Escape`) {
        removeCard();
        window.pin.removeClassActivePin();
      }
      popupCloseButton.removeEventListener(`click`, onCardCloseButtonClick);
      document.removeEventListener(`keydown`, onCardEscapePress);
    };

    popupCloseButton.addEventListener(`click`, onCardCloseButtonClick);
    popupCloseButton.addEventListener(`keydown`, onCardCloseButtonEnterPress);
    document.addEventListener(`keydown`, onCardEscapePress);
    window.main.map.insertBefore(cardElement, beforeThisBlock);
  };

  window.card = {
    createCard,
    removeCard,
  };
})();
