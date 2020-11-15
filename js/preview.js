'use strict';

const PREVIEW_PLACE_HOLDER = `img/muffin-grey.svg`;

const avatar = document.querySelector(`#avatar`);
const images = document.querySelector(`#images`);
const avatarChooser = document.querySelector(`#avatar`);
const avatarPreview = document.querySelector(`.ad-form-header__preview`).querySelector(`img`);
const imagesChooser = document.querySelector(`#images`);
let imagePreview = document.querySelector(`.ad-form__photo`).querySelector(`img`);

(function () {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  avatarChooser.addEventListener(`change`, function () {
    let file = avatarChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  imagesChooser.addEventListener(`change`, function (evt) {
    let file = imagesChooser.files[0];
    const fileName = file.name.toLowerCase();
    let container = evt.target.closest(`.ad-form-header__upload`);

    if (!container) {
      container = evt.target.closest(`.ad-form__photo-container`);
      let newImg = document.createElement(`img`);
      newImg.width = `40`;
      newImg.height = `44`;
      container.querySelector(`.ad-form__photo`).appendChild(newImg);
    }

    const image = container.querySelector(`img`);

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        image.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();

avatar.setAttribute(`accept`, `image/png, image/jpeg`);
images.setAttribute(`accept`, `image/png, image/jpeg`);

const clearPrewiew = () => {
  avatarPreview.src = PREVIEW_PLACE_HOLDER;
  imagePreview = document.querySelector(`.ad-form__photo`).querySelector(`img`);
  if (imagePreview) {
    imagePreview.remove();
  }
};

window.prewiew = {
  clear: clearPrewiew
};
