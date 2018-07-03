'use strict';

(function () {

  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var POST_URL = 'https://js.dump.academy/kekstagram';

  var getRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 301:
          onError('Ресурс навсегда переехал на новый сервер');
          break;
        case 307:
          onError('Ресурс временно переехал на новый сервер');
          break;
        case 400:
          onError('Неверный запрос');
          break;
        case 401:
          onError('Пользователь не авторизован');
          break;
        case 404:
          onError('Ничего не найдено');
          break;
        case 500:
          onError('Произошла внутренняя ошибка сервера');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = getRequest(onLoad, onError);
      xhr.open('GET', GET_URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = getRequest(onLoad, onError);
      xhr.open('POST', POST_URL);
      xhr.send(data);
    }
  };
})();
