'use strict';

(function () {
  var pasteUsersPictures = function () {
    var usersPictures = window.generateUsersPictures();
    var usersPicturesList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    var renderUserPicture = function (element) {
      var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link').cloneNode(true);

      var onUserPictureClick = function (evt) {
        evt.preventDefault();
        window.renderBigPicture(element);
      };

      userPictureTemplate.href = element.url;
      userPictureTemplate.addEventListener('click', onUserPictureClick);
      userPictureTemplate.querySelector('.picture__img').src = element.url;
      userPictureTemplate.querySelector('.picture__stat--likes').textContent = element.likes;
      userPictureTemplate.querySelector('.picture__stat--comments').textContent = element.comments.length;

      return userPictureTemplate;
    };

    for (var i = 0; i < usersPictures.length; i++) {
      fragment.appendChild(renderUserPicture(usersPictures[i]));
    }

    usersPicturesList.appendChild(fragment);
  };

  pasteUsersPictures();
}());
