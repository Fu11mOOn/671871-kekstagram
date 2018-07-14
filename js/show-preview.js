'use strict';

(function () {
  window.showPreview = function (element) {
    var NUMBER_OF_COMMENTS = 5;

    var commentsList = document.querySelector('.social__comments');
    var commentsCount = document.querySelector('.social__comment-count');
    var loadMoreButton = document.querySelector('.social__loadmore');
    var bigPictureCloseButton = document.querySelector('.big-picture__cancel');
    var bigPicture = document.querySelector('.big-picture');
    var lastFocusedElement = document.activeElement;
    var isCommentsFinish = false;
    var isFirstOpen = true;
    var position = {
      start: 0,
      end: 0
    };

    var renderPreviewComments = function (array) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < array.length; i++) {
        var commentTemplate = document.querySelector('.social__comment').cloneNode(true);
        var imageElement = commentTemplate.querySelector('.social__picture');

        commentTemplate.classList.add('social__comment--text');
        imageElement.src = 'img/avatar-' + window.utilits.getRandomIntegerFromInterval(1, 7) + '.svg';
        commentTemplate.textContent = array[i];
        commentTemplate.insertBefore(imageElement, commentTemplate.firstChild);
        fragment.appendChild(commentTemplate);
      }

      if (isFirstOpen) {
        window.utilits.removeAllChildElement(commentsList);
        isFirstOpen = false;
      }

      commentsList.appendChild(fragment);
    };
    var onLoadMorePressed = function () {
      var renderedComments = [];

      position.end += NUMBER_OF_COMMENTS;

      if (position.end > element.comments.length) {
        position.end = element.comments.length;

        if (position.start > element.comments.length) {
          position.start -= NUMBER_OF_COMMENTS;
        }
      }
      if (!isCommentsFinish) {
        renderedComments = element.comments.slice(position.start, position.end);
        renderPreviewComments(renderedComments);

        if (position.end === element.comments.length) {
          isCommentsFinish = true;
          loadMoreButton.classList.add('hidden');
        }
      }

      position.start += NUMBER_OF_COMMENTS;
      commentsCount.textContent = position.end + ' из ' + element.comments.length + ' комментариев';
    };
    var onBigPictureClose = function () {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      loadMoreButton.classList.remove('hidden');
      lastFocusedElement.focus();
      bigPictureCloseButton.removeEventListener('click', onBigPictureClose);
      document.removeEventListener('keydown', onBigPictureEscPress);
      loadMoreButton.removeEventListener('click', onLoadMorePressed);
    };
    var onBigPictureEscPress = function (evt) {
      window.utilits.escPressed(evt, onBigPictureClose);
    };

    bigPicture.classList.remove('hidden');
    loadMoreButton.focus();
    bigPicture.scrollTo(0, 0);
    bigPicture.querySelector('.big-picture__img > img').src = element.url;
    bigPicture.querySelector('.likes-count').textContent = element.likes;
    bigPicture.querySelector('.social__caption').textContent = element.description;
    loadMoreButton.addEventListener('click', onLoadMorePressed);
    bigPictureCloseButton.addEventListener('click', onBigPictureClose);
    document.addEventListener('keydown', onBigPictureEscPress);
    onLoadMorePressed();
  };
}());
