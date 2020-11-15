'use strict';

const fieldsets = document.getElementsByTagName(`fieldset`);
const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const mainFormReset = document.querySelector(`.ad-form__reset`);

const formTurnOff = () => {
  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }
};

const formTurnOn = () => {
  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
};

const onUploadSuccess = () => {
  const renderSuccessMessage = () => {
    const successMessageElement = successMessageTemplate.cloneNode(true);

    const onSuccessMessageEscapePress = (evt) => {
      if (evt.key === `Escape`) {
        successMessageElement.remove();
      }
      document.removeEventListener(`keydown`, onSuccessMessageEscapePress);
      document.removeEventListener(`click`, onSuccessMessageClick);
    };

    const onSuccessMessageClick = () => {
      successMessageElement.remove();
      document.removeEventListener(`click`, onSuccessMessageClick);
      document.removeEventListener(`keydown`, onSuccessMessageEscapePress);
    };

    document.addEventListener(`keydown`, onSuccessMessageEscapePress);
    document.addEventListener(`click`, onSuccessMessageClick);

    return successMessageElement;
  };

  document.body.appendChild(renderSuccessMessage());
  window.validation.mainForm.reset();
  window.validation.checkFormValidity();
  window.move.setAddress(window.move.pinHeightDisable);
};

const onUploadError = () => {
  const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const renderErrorMessage = () => {
    const errorMessageElement = errorMessageTemplate.cloneNode(true);
    const errorMessageButton = errorMessageElement.querySelector(`.error__button`);

    const onErrorMessageEscapePress = (evt) => {
      if (evt.key === `Escape`) {
        errorMessageElement.remove();
      }
      document.removeEventListener(`keydown`, onErrorMessageEscapePress);
      document.removeEventListener(`click`, onErrorMessageClick);
    };

    const onErrorMessageClick = () => {
      errorMessageElement.remove();
      document.removeEventListener(`click`, onErrorMessageClick);
      document.removeEventListener(`keydown`, onErrorMessageEscapePress);
    };

    errorMessageButton.addEventListener(`click`, onErrorMessageClick);
    document.addEventListener(`click`, onErrorMessageClick);
    document.addEventListener(`keydown`, onErrorMessageEscapePress);

    return errorMessageElement;
  };

  document.body.appendChild(renderErrorMessage());
};

window.validation.mainForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  window.backend.save(new FormData(window.validation.mainForm), onUploadSuccess, onUploadError);
  window.validation.mainForm.reset();
  window.main.disactivatePage();
});

mainFormReset.addEventListener(`click`, () => {
  window.validation.mainForm.reset();
  window.validation.checkFormValidity();
  window.main.disactivatePage();
});


window.form = {
  turnOff: formTurnOff,
  turnOn: formTurnOn
};
