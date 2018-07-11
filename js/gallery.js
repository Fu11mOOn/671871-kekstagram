'use strict';

(function () {
  var NUMBER_OF_NEW_PICTURES = 10;

  var usersPicturesList = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var pictures = [];
  var picturesCopy = [];

  var applayFilterPopular = function () {
    window.renderPictures(pictures);
  };
  var applayFilterNew = function () {
    picturesCopy = pictures.slice().sort(function () {
      return Math.random() - 0.5;
    }).slice(0, NUMBER_OF_NEW_PICTURES);
    window.renderPictures(picturesCopy);
    picturesCopy = [];
  };
  var applayFilterDiscussed = function () {
    picturesCopy = pictures.slice().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    window.renderPictures(picturesCopy);
    picturesCopy = [];
  };
  window.gallery = {
    filter: function (filter) {
      switch (filter) {
        case 'filter-popular':
          applayFilterPopular();
          break;
        case 'filter-new':
          applayFilterNew();
          break;
        case 'filter-discussed':
          applayFilterDiscussed();
          break;
      }
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
