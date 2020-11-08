'use strict';
(() => {
  const fieldsets = document.getElementsByTagName(`fieldset`);
  const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const mainFormReset = document.querySelector(`.ad-form__reset`);

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

  const uploadSuccessHandler = () => {
    const renderSuccessMessage = () => {
      const successMessageElement = successMessageTemplate.cloneNode(true);

      const escHandler = (evt) => {
        if (evt.key === `Escape`) {
          successMessageElement.remove();
        }
        document.removeEventListener(`keydown`, escHandler);
        document.removeEventListener(`click`, clickHandler);
      };

      const clickHandler = () => {
        successMessageElement.remove();
        document.removeEventListener(`click`, clickHandler);
        document.removeEventListener(`keydown`, escHandler);
      };

      document.addEventListener(`keydown`, escHandler);
      document.addEventListener(`click`, clickHandler);

      return successMessageElement;
    };

    document.body.appendChild(renderSuccessMessage());
    window.validation.mainForm.reset();
    window.validation.checkFormValidity();
    window.move.getAddress(window.move.pinHeightDisable);
  };

  const uploadErrorHandler = () => {
    const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

    const renderErrorMessage = () => {
      const errorMessageElement = errorMessageTemplate.cloneNode(true);
      const errorMessageButton = errorMessageElement.querySelector(`.error__button`);

      const escHandler = (evt) => {
        if (evt.key === `Escape`) {
          errorMessageElement.remove();
        }
        document.removeEventListener(`keydown`, escHandler);
        document.removeEventListener(`click`, clickHandler);
      };

      const clickHandler = () => {
        errorMessageElement.remove();
        document.removeEventListener(`click`, clickHandler);
        document.removeEventListener(`keydown`, escHandler);
      };

      errorMessageButton.addEventListener(`click`, clickHandler);
      document.addEventListener(`click`, clickHandler);
      document.addEventListener(`keydown`, escHandler);

      return errorMessageElement;
    };

    document.main.appendChild(renderErrorMessage());
  };

  window.validation.mainForm.addEventListener(`submit`, (evt) => {
    window.backend.save(new FormData(window.validation.mainForm), uploadSuccessHandler, uploadErrorHandler);

    evt.preventDefault();
    window.validation.mainForm.reset();
    window.main.getDisablePages();
  });

  mainFormReset.addEventListener(`click`, () => {
    window.main.getDisablePages();
    window.validation.mainForm.reset();
    window.validation.checkFormValidity();
  });

  window.form = {
    formTurnOff,
    formTurnOn
  };
})();
