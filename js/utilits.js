'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var errorClass = 'error-message';

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
    addErrorText: function (errorText, element) {
      var lastElement = element.lastElementChild;

      if (!lastElement.classList.contains(errorClass)) {
        var text = document.createElement('p');

        text.textContent = errorText;
        text.classList.add(errorClass);
        element.appendChild(text);
      }
    },
    removeErrorText: function (element) {
      var lastElement = element.lastElementChild;

      if (lastElement.classList.contains(errorClass)) {
        lastElement.remove();
      }
    }
  };
}());
