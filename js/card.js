'use strict';
(() => {
  const PHOTO_WIDTH = 45;
  const PHOTO_HEIGHT = 40;

  const similarCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const createCard = (bookingItem) => {
    const cardElement = similarCardTemplate.cloneNode(true);
    const featureElement = cardElement.querySelector(`.popup__features`);
    const photoElement = cardElement.querySelector(`.popup__photos`);

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
    cardType.textContent = bookingItem.offer.type;
    cardCapacity.textContent =
      `${bookingItem.offer.rooms}
      ${window.util.getNoun(bookingItem.offer.rooms, `комната`, `комнаты`, `комнат`)}
      ${bookingItem.offer.guests > 0 ? `для ${bookingItem.offer.guests}
      ${window.util.getNoun(bookingItem.offer.guests, `гостя`, `гостей`, `гостей`)}` : `не для гостей`}`;
    cardTime.textContent =
      `Заезд после ${bookingItem.offer.checkin},
      выезд до ${bookingItem.offer.checkout}`;

    while (featureElement.firstChild) {
      featureElement.removeChild(featureElement.firstChild);
    }
    for (let i = 0; i < bookingItem.offer.features.length; i++) {
      featureElement.appendChild(document.createElement(`li`))
      .classList.add(`popup__feature`, `popup__feature--${bookingItem.offer.features[i]}`);
    }

    cardDescription.textContent = bookingItem.offer.description;

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

    cardAvatar.setAttribute(`src`, `${bookingItem.author.avatar}`);

    return cardElement;
  };

  const addCards = (preparedCards) => {

    preparedCards.forEach(function (element) {
      window.main.map.appendChild(createCard(element));
    });
  };

  window.card = {
    createCard,
    addCards
  };
})();
