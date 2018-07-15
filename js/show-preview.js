'use strict';

(function () {
  window.showPreview = function (element) {
    var NUMBER_OF_COMMENTS = 5;

    var preview = document.querySelector('.big-picture');
    var commentsCount = preview.querySelector('.social__comment-count');
    var commentsList = preview.querySelector('.social__comments');
    var loadMoreButton = preview.querySelector('.social__loadmore');
    var bigPictureCloseButton = preview.querySelector('.big-picture__cancel');
    var lastFocusedElement = document.activeElement;
    var isCommentsFinish = false;
    var isFirstOpen = true;
    var position = {
      start: 0,
      end: 0
    };

    var renderPreviewComments = function (array) {
      var fragment = document.createDocumentFragment();

      array.forEach(function (comment) {
        var commentTemplate = document.querySelector('.social__comment').cloneNode(true);
        var imageElement = commentTemplate.querySelector('.social__picture');

        commentTemplate.classList.add('social__comment--text');
        imageElement.src = 'img/avatar-' + window.utilits.getRandomIntegerFromInterval(1, 7) + '.svg';
        commentTemplate.textContent = comment;
        commentTemplate.insertBefore(imageElement, commentTemplate.firstChild);
        fragment.appendChild(commentTemplate);
      });

      if (isFirstOpen) {
        window.utilits.removeAllChildElement(commentsList);
        isFirstOpen = false;
      }

      commentsList.appendChild(fragment);
    };
    var onLoadMorePressed = function () {
      var renderedComments;

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
      preview.classList.add('hidden');
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

    preview.classList.remove('hidden');
    loadMoreButton.focus();
    preview.querySelector('.big-picture__img > img').src = element.url;
    preview.querySelector('.likes-count').textContent = element.likes;
    loadMoreButton.addEventListener('click', onLoadMorePressed);
    bigPictureCloseButton.addEventListener('click', onBigPictureClose);
    document.addEventListener('keydown', onBigPictureEscPress);
    onLoadMorePressed();
  };
}());
