'use strict';

var DESCRIPTIONS_LIST = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var COMMENTS_LIST = [
  'Все отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var EFFECT_CLASSES = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];
var NUMBER_OF_PICTURES = 25;
var ESC_KEYCODE = 27;
var ORIGINAL_PICTURE_CLASS = 'effects__preview--none';

var getRandomIntegerFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var generateUsersPictures = function (descriptionsList, commentsList, numberOfPictures) {
  var usersPictures = [];

  var generateUserComments = function (array) {
    for (var i = 0; i < 2; i++) {
      array.comments[i] = [];

      for (var j = 0; j < getRandomIntegerFromInterval(1, 3); j++) {
        array.comments[i] += commentsList[getRandomIntegerFromInterval(0, commentsList.length)] + ' ';
      }
    }
  };

  for (var i = 0; i < numberOfPictures; i++) {
    usersPictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomIntegerFromInterval(15, 201),
      comments: [],
      description: descriptionsList[getRandomIntegerFromInterval(0, descriptionsList.length)]
    };

    generateUserComments(usersPictures[i]);
  }

  return usersPictures;
};
var pasteUsersPictures = function (array) {
  var usersPicturesList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var renderUserPicture = function (element) {
    var userPictureTemplate = document.querySelector('#picture').content.cloneNode(true);
    var pictureLink = userPictureTemplate.querySelector('.picture__link');

    var onUserPictureClick = function (evt) {
      evt.preventDefault();
      renderBigPicture(element);
    };

    pictureLink.href = element.url;
    pictureLink.addEventListener('click', onUserPictureClick);
    userPictureTemplate.querySelector('.picture__img').src = element.url;
    userPictureTemplate.querySelector('.picture__stat--likes').textContent = element.likes;
    userPictureTemplate.querySelector('.picture__stat--comments').textContent = element.comments.length;

    return userPictureTemplate;
  };

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderUserPicture(usersPictures[i]));
  }

  usersPicturesList.appendChild(fragment);
};
var renderBigPicture = function (element) {
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
      imageElement.src = 'img/avatar-' + getRandomIntegerFromInterval(1, 7) + '.svg';
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
  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onBigPictureClose();
    }
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
var impositionOfEffectsOnPicturePreview = function () {
  var picturePreview = document.querySelector('.img-upload__preview img');
  var pictureEffects = document.querySelectorAll('.effects__preview');
  var pictureEffectsInput = document.querySelectorAll('.effects__radio');

  var changeClassOfPicturePreviewWhenPressedOnEffect = function (effect, input) {
    effect.addEventListener('click', function () {
      var effectClasses = effect.classList;

      for (var i = 0; i < effectClasses.length; i++) {
        if (EFFECT_CLASSES.indexOf(effectClasses[i]) !== -1) {
          var currentClass = effectClasses[i];

          picturePreview.classList = '';
          picturePreview.classList.add(currentClass);
          input.checked = true;
        }
      }

      changeEffectIntensity();
    });
  };
  // Просто заготовка для будущей функции изменения насыщенности эффекта
  var changeEffectIntensity = function () {
    // var sliderOfEffectIntensity = document.querySelector('.scale__pin');
    var sliderContainer = document.querySelector('.img-upload__scale');

    if (picturePreview.classList.contains(ORIGINAL_PICTURE_CLASS)) {
      sliderContainer.classList.add('hidden');
    } else {
      sliderContainer.classList.remove('hidden');
    }
  };

  if (isFirstOpenOfEditor) {
    isFirstOpenOfEditor = false;

    for (var i = 0; i < pictureEffects.length; i++) {
      changeClassOfPicturePreviewWhenPressedOnEffect(pictureEffects[i], pictureEffectsInput[i]);
    }
  }

  changeEffectIntensity();
};
var onPictureEditorClose = function () {
  pictureEditor.classList.add('hidden');
  document.removeEventListener('keydown', onPictureEditorEscPressed);
  pictureEditorCloseButton.removeEventListener('click', onPictureEditorClose);
  pictureUpload.value = '';
};
var onPictureEditorEscPressed = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onPictureEditorClose();
  }
};

var usersPictures = generateUsersPictures(DESCRIPTIONS_LIST, COMMENTS_LIST, NUMBER_OF_PICTURES);
var commentCount = document.querySelector('.social__comment-count');
var commentLoadMore = document.querySelector('.social__loadmore');
var pictureUpload = document.querySelector('#upload-file');
var pictureEditor = document.querySelector('.img-upload__overlay');
var pictureEditorCloseButton = document.querySelector('.img-upload__cancel');
var isFirstOpenOfEditor = true;

pasteUsersPictures(usersPictures);
commentCount.classList.add('visually-hidden');
commentLoadMore.classList.add('visually-hidden');
pictureUpload.addEventListener('change', function () {
  pictureEditor.classList.remove('hidden');
  document.addEventListener('keydown', onPictureEditorEscPressed);
  pictureEditorCloseButton.addEventListener('click', onPictureEditorClose);
  impositionOfEffectsOnPicturePreview();
});
