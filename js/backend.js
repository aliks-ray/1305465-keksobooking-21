'use strict';

(function () {

  const TIMEOUT = 20000;
  const SAVE = `https://21.javascript.pages.academy/keksobooking`;
  const LOAD = `https://21.javascript.pages.academy/keksobooking/data`;

  const StatusCode = {
    OK: 200
  };

  let createRequest = function (method, url, onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        default:
          onError(`Ошибка соединения. Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс.`);
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);

    return xhr;
  };

  let load = function (onLoad, onError) {
    let xhr = createRequest(`GET`, LOAD, onLoad, onError);
    xhr.send();
  };

  let save = function (data, onLoad, onError) {
    let xhr = createRequest(`POST`, SAVE, onLoad, onError);
    xhr.send(data);
  };

  let onError = (errorMessage) => {
    const errorElement = document.createElement(`div`);
    errorElement.style =
    `z-index: 100;
    margin: auto;
    padding: 30px;
    width: 900px;
    top: 50%;
    left: 50%;
    text-align: center;
    background-color: #be3827;
    border: #be3827 1px solid;
    border-radius: 10px;
    color: white;
    box-shadow: 0 10px 10px rgba(0, 1, 1, 0.3);`;
    errorElement.style.position = `absolute`;
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = `30px`;

    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errorElement);

    setTimeout(function () {
      errorElement.remove();
    }, 5000);
  };

  window.backend = {
    load,
    save,
    onError
  };

})();
