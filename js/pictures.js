'use strict';

(function () {
  var usersPicturesList = document.querySelector('.pictures');

  var pasteUsersPictures = function (array) {
    var fragment = document.createDocumentFragment();

    var renderUserPicture = function (element) {
      var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link').cloneNode(true);

      var onUserPictureClick = function (evt) {
        evt.preventDefault();
        window.showPreview(element);
      };

      userPictureTemplate.href = element.url;
      userPictureTemplate.addEventListener('click', onUserPictureClick);
      userPictureTemplate.querySelector('.picture__img').src = element.url;
      userPictureTemplate.querySelector('.picture__stat--likes').textContent = element.likes;
      userPictureTemplate.querySelector('.picture__stat--comments').textContent = element.comments.length;

      return userPictureTemplate;
    };

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderUserPicture(array[i]));
    }

    usersPicturesList.appendChild(fragment);
  };
  var onLoad = function (array) {
    pasteUsersPictures(array);
    window.utilits.removeErrorText(usersPicturesList);
  };
  var onError = function (errorText) {
    window.utilits.addErrorText(errorText, usersPicturesList);
  };

  window.backend.load(onLoad, onError);
}());
