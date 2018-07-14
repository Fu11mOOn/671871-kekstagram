'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var LEFT_KEYCODE = 37;
  var RIGHT_KEYCODE = 39;
  var ERROR_CLASS = 'error-message';
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  window.utilits = {
    getRandomIntegerFromInterval: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getNumberOfSimilarElementsAtArray: function (array, element) {
      var number = 0;

      for (var i = 0; i < array.length; i++) {
        if (array[i] === element) {
          number++;
        }
      }

      return number;
    },
    escPressed: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    enterPressed: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    leftPressed: function (evt, action) {
      if (evt.keyCode === LEFT_KEYCODE) {
        action();
      }
    },
    rightPressed: function (evt, action) {
      if (evt.keyCode === RIGHT_KEYCODE) {
        action();
      }
    },
    addErrorText: function (errorText, element) {
      var lastElement = element.lastElementChild;

      if (!lastElement.classList.contains(ERROR_CLASS)) {
        var text = document.createElement('p');

        text.textContent = errorText;
        text.classList.add(ERROR_CLASS);
        element.appendChild(text);
      }
    },
    removeErrorText: function (element) {
      var lastElement = element.lastElementChild;

      if (lastElement.classList.contains(ERROR_CLASS)) {
        lastElement.remove();
      }
    },
    removeAllChildElement: function (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    },
    eliminateBounce: function (fun) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    }
  };
}());
