'use strict';

const TIMEOUT = 20000;
const SAVE = `https://21.javascript.pages.academy/keksobooking`;
const LOAD = `https://21.javascript.pages.academy/keksobooking/data`;

const StatusCode = {
  OK: 200
};

const createRequest = (method, url, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    switch (xhr.status) {
      case StatusCode.OK:
        onLoad(xhr.response);
        break;
      default:
        onError(`Ошибка соединения. Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        break;
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс.`);
  });

  xhr.timeout = TIMEOUT;
  xhr.open(method, url);

  return xhr;
};

const load = (onLoad, onError) => {
  const xhr = createRequest(`GET`, LOAD, onLoad, onError);
  xhr.send();
};

const save = (data, onLoad, onError) => {
  const xhr = createRequest(`POST`, SAVE, onLoad, onError);
  xhr.send(data);
};

const onError = (errorMessage) => {
  const errorElement = document.createElement(`div`);
  errorElement.classList.add(`error__upload`);

  errorElement.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

window.backend = {
  load,
  save,
  onError
};
