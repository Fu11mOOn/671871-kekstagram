'use strict';

(function () {
  window.renderPictures = function (array) {
    var usersPicturesList = document.querySelector('.pictures');
    var pictures = document.querySelectorAll('.picture__link');
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

    pictures.forEach(function (element) {
      element.remove();
    });
    usersPicturesList.appendChild(fragment);
  };
}());
