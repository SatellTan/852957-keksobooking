'use strict';

(function () {

  var URL_POST = 'https://js.dump.academy/keksobooking';
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000;
  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FROUND_ERROR: 404,
    SERVER_ERROR: 500
  };
  var error;

  var processServerResponse = function (xhr, onLoad) {
    switch (xhr.status) {
      case Code.SUCCESS:
        onLoad(xhr.response);
        break;
      case Code.BAD_REQUEST:
        error = 'Неверный запрос';
        break;
      case Code.UNAUTHORIZED:
        error = 'Пользователь не авторизован';
        break;
      case Code.NOT_FROUND_ERROR:
        error = 'Ничего не найдено';
        break;
      case Code.SERVER_ERROR:
        error = 'Внутренняя ошибка сервера';
        break;
      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIMEOUT;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.addEventListener('load', function () {
      error = '';

      processServerResponse(xhr, onLoad);

      if (error) {
        onError(error);
      }
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      error = '';

      processServerResponse(xhr, onLoad);

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  window.backend = {
    save: save,
    load: load
  };

})();
