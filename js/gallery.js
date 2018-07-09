'use strict';

(function () {
  var NUMBER_OF_NEW_PICTURES = 10;

  var usersPicturesList = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var pictures = [];
  var picturesCopy = [];

  window.gallery = {
    setPopular: function () {
      window.renderPictures(pictures);
    },
    setNew: function () {
      var url = [];

      for (var i = 0; i < NUMBER_OF_NEW_PICTURES; i++) {
        while (!picturesCopy[i]) {
          var randomPicture = pictures[window.utilits.getRandomIntegerFromInterval(0, pictures.length)];

          if (!window.utilits.getNumberOfSimilarElementsAtArray(url, randomPicture.url)) {
            picturesCopy[i] = randomPicture;
            url[i] = randomPicture.url;
          }
        }
      }

      window.renderPictures(picturesCopy);
      url = [];
      picturesCopy = [];
    },
    setDiscussed: function () {
      picturesCopy = pictures.slice();
      picturesCopy.sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
      window.renderPictures(picturesCopy);
      picturesCopy = [];
    }
  };
  var onLoad = function (array) {
    window.renderPictures(array);
    filters.classList.remove('img-filters--inactive');
    pictures = array;
    window.utilits.removeErrorText(usersPicturesList);
  };
  var onError = function (errorText) {
    window.utilits.addErrorText(errorText, usersPicturesList);
  };

  window.backend.load(onLoad, onError);
})();
