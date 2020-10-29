'use strict';
(() => {
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

  window.form = {
    formTurnOff,
    formTurnOn
  };
})();
