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
        document.body.classList.add('modal-open');
      };

      userPictureTemplate.href = element.url;
      userPictureTemplate.addEventListener('click', onUserPictureClick);
      userPictureTemplate.querySelector('.picture__img').src = element.url;
      userPictureTemplate.querySelector('.picture__stat--likes').textContent = element.likes;
      userPictureTemplate.querySelector('.picture__stat--comments').textContent = element.comments.length;

      return userPictureTemplate;
    };

    array.forEach(function (element) {
      fragment.appendChild(renderUserPicture(element));
    });
    pictures.forEach(function (element) {
      element.remove();
    });
    usersPicturesList.appendChild(fragment);
  };
}());
