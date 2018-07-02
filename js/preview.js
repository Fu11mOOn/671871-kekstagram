'use strict';

(function () {
  var commentCount = document.querySelector('.social__comment-count');
  var commentLoadMore = document.querySelector('.social__loadmore');

  window.preview = function (element) {
    var bigPictureCloseButton = document.querySelector('.big-picture__cancel');
    var bigPicture = document.querySelector('.big-picture');

    var renderBigPictureComments = function () {
      var commentsList = document.querySelector('.social__comments');
      var fragment = document.createDocumentFragment();

      var removePreviousComments = function () {
        while (commentsList.children.length) {
          commentsList.removeChild(commentsList.firstChild);
        }
      };

      for (var i = 0; i < element.comments.length; i++) {
        var commentTemplate = document.querySelector('.social__comment').cloneNode(true);
        var imageElement = commentTemplate.querySelector('.social__picture');

        commentTemplate.classList.add('social__comment--text');
        imageElement.src = 'img/avatar-' + window.utilits.getRandomIntegerFromInterval(1, 7) + '.svg';
        commentTemplate.textContent = element.comments[i];
        commentTemplate.insertBefore(imageElement, commentTemplate.firstChild);
        fragment.appendChild(commentTemplate);
      }

      removePreviousComments();
      commentsList.appendChild(fragment);
    };
    var onBigPictureClose = function () {
      bigPicture.classList.add('hidden');
      bigPictureCloseButton.removeEventListener('click', onBigPictureClose);
      document.removeEventListener('keydown', onBigPictureEscPress);
    };
    var onBigPictureEscPress = function () {
      window.utilits.escPressed(onBigPictureClose());
    };

    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img > img').src = element.url;
    bigPicture.querySelector('.likes-count').textContent = element.likes;
    bigPicture.querySelector('.comments-count').textContent = element.comments.length;
    bigPicture.querySelector('.social__caption').textContent = element.description;
    bigPictureCloseButton.addEventListener('click', onBigPictureClose);
    document.addEventListener('keydown', onBigPictureEscPress);
    renderBigPictureComments();
  };

  commentCount.classList.add('visually-hidden');
  commentLoadMore.classList.add('visually-hidden');
}());
