'use strict';

(function () {
  var ESC_KEYCODE = 27;

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
    }
  };
}());
