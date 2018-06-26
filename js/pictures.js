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
var EFFECT_PROPERTY = [
  'grayscale',
  'sepia',
  'invert',
  'blur',
  'brightness'
];
var EFFECT_VALUE = [
  1,
  1,
  1,
  3,
  2
];
var NUMBER_OF_PICTURES = 25;
var ESC_KEYCODE = 27;
var ORIGINAL_PICTURE_CLASS = 'effects__preview--none';
var PHOBOS_PICTURE_CLASS = 'effects__preview--phobos';
var HEAT_PICTURE_CLASS = 'effects__preview--heat';
var STEP_OF_CHANGE_SIZE_OF_PICTURE_PREVIEW = 25;
var MIN_SIZE_OF_PICTURE_PREVIEW = 25;
var MAX_SIZE_OF_PICTURE_PREVIEW = 100;
var HASHTAGS_MAX_LENGTH = 20;
var HASHTAGS_MAX_NUMBER = 5;

var commentCount = document.querySelector('.social__comment-count');
var commentLoadMore = document.querySelector('.social__loadmore');
var pictureUpload = document.querySelector('#upload-file');
var pictureEditor = document.querySelector('.img-upload__overlay');
var pictureEditorCloseButton = document.querySelector('.img-upload__cancel');

var getRandomIntegerFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var getNumberOfSimilarElementsAtArray = function (array, element) {
  var number = 0;

  for (var i = 0; i < array.length; i++) {
    if (array[i] === element) {
      number++;
    }
  }

  return number;
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
var pasteUsersPictures = function () {
  var usersPictures = generateUsersPictures(DESCRIPTIONS_LIST, COMMENTS_LIST, NUMBER_OF_PICTURES);
  var usersPicturesList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var renderUserPicture = function (element) {
    var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link').cloneNode(true);

    var onUserPictureClick = function (evt) {
      evt.preventDefault();
      renderBigPicture(element);
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
var onPictureUploadChange = function () {
  var picturePreview = document.querySelector('.img-upload__preview img');
  var pictureEffects = document.querySelectorAll('.effects__preview');
  var pictureEffectsInput = document.querySelectorAll('.effects__radio');
  var sizeUpButton = document.querySelector('.resize__control--plus');
  var sizeDownButton = document.querySelector('.resize__control--minus');
  var sizeInput = document.querySelector('.resize__control--value');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');
  var uploadSubmitButton = document.querySelector('.img-upload__submit');
  var currentSize = MAX_SIZE_OF_PICTURE_PREVIEW;
  var sliderContainer = document.querySelector('.img-upload__scale');
  var sliderOfEffectIntensity = document.querySelector('.scale__pin');
  var sliderValue = document.querySelector('.scale__value');
  var sliderLine = document.querySelector('.scale__line');
  var sliderBar = document.querySelector('.scale__level');
  var lineWidth = '';

  var changeDisplayOfSlider = function () {
    if (picturePreview.classList.contains(ORIGINAL_PICTURE_CLASS)) {
      sliderContainer.classList.add('hidden');
    } else {
      sliderContainer.classList.remove('hidden');
    }
  };
  var setDelaultOfEffect = function () {
    sliderBar.style.width = 100 + '%';
    sliderOfEffectIntensity.style.left = lineWidth + 'px';
    sliderValue.value = 100;
    picturePreview.style.filter = '';
  };
  var onEffectPressed = function (evt) {
    var elementClasses = evt.target.classList;

    for (var i = 0; i < elementClasses.length; i++) {
      if (EFFECT_CLASSES.indexOf(elementClasses[i]) !== -1) {
        var currentClass = elementClasses[i];
        var elementNumber = EFFECT_CLASSES.indexOf(currentClass);

        picturePreview.classList = '';
        picturePreview.classList.add(currentClass);
        pictureEffectsInput[elementNumber].checked = true;
      }
    }

    setDelaultOfEffect();
    changeDisplayOfSlider();
  };
  var scalePicturePreview = function (value) {
    var editProperty = function (valueOfProperty) {
      currentSize = valueOfProperty;
      sizeInput.value = currentSize + '%';

      if (currentSize === MAX_SIZE_OF_PICTURE_PREVIEW) {
        picturePreview.style.transform = '';
      } else {
        picturePreview.style.transform = 'scale(0.' + currentSize + ')';
      }
    };

    if (value >= MAX_SIZE_OF_PICTURE_PREVIEW) {
      editProperty(MAX_SIZE_OF_PICTURE_PREVIEW);
    } else if (value < MIN_SIZE_OF_PICTURE_PREVIEW) {
      editProperty(MIN_SIZE_OF_PICTURE_PREVIEW);
    } else {
      editProperty(value);
    }
  };
  var onSizeUpButtonPressed = function () {
    if (currentSize < MAX_SIZE_OF_PICTURE_PREVIEW) {
      scalePicturePreview(currentSize + STEP_OF_CHANGE_SIZE_OF_PICTURE_PREVIEW);
    }
  };
  var onSizeDownButtonPressed = function () {
    if (currentSize > MIN_SIZE_OF_PICTURE_PREVIEW) {
      scalePicturePreview(currentSize - STEP_OF_CHANGE_SIZE_OF_PICTURE_PREVIEW);
    }
  };
  var onSliderMouseDown = function (evt) {
    var startCoordinateX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      var shiftX = startCoordinateX - moveEvt.clientX;
      var coordinate = sliderOfEffectIntensity.offsetLeft - shiftX;

      moveEvt.preventDefault();
      startCoordinateX = moveEvt.clientX;

      if (coordinate >= 0 && coordinate <= lineWidth) {
        var percent = coordinate / lineWidth;

        var changeFilterValue = function (effectClass, property, value) {
          if (picturePreview.classList.contains(effectClass)) {
            if (picturePreview.classList.contains(PHOBOS_PICTURE_CLASS)) {
              picturePreview.style.filter = property + '(' + (percent * value) + 'px)';
            } else if (picturePreview.classList.contains(HEAT_PICTURE_CLASS)) {
              picturePreview.style.filter = property + '(' + ((percent * value) + 1) + ')';
            } else {
              picturePreview.style.filter = property + '(' + percent * value + ')';
            }
          }
        };

        sliderOfEffectIntensity.style.left = coordinate + 'px';
        sliderBar.style.width = Math.floor(percent * 100) + '%';
        sliderValue.value = Math.floor(percent * 100);

        for (var i = 0; i < EFFECT_PROPERTY.length; i++) {
          changeFilterValue(EFFECT_CLASSES[i + 1], EFFECT_PROPERTY[i], EFFECT_VALUE[i]);
        }
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  var onFormSubmit = function () {
    var hashtags = hashtagsInput.value.trim();
    var arrayHashtags = hashtags.split(' ');

    var hashtagsInputValidation = function () {
      if (hashtagsInput.validity.valid) {
        hashtagsInput.classList.remove('text__hashtags--error');
      } else {
        hashtagsInput.classList.add('text__hashtags--error');
      }
    };

    if (hashtags) {
      for (var i = 0; i < arrayHashtags.length; i++) {
        arrayHashtags[i] = arrayHashtags[i].toLowerCase();

        if (arrayHashtags[i][0] !== '#') {
          hashtagsInput.setCustomValidity('Хештег должен начинаться с символа "#"');
        } else if (arrayHashtags[i].length === 1) {
          hashtagsInput.setCustomValidity('Хештег не может содержать только символ "#"');
        } else if (getNumberOfSimilarElementsAtArray(arrayHashtags[i], '#') > 1) {
          hashtagsInput.setCustomValidity('Хештеги нужно отделять друг от друга пробелами');
        } else if (getNumberOfSimilarElementsAtArray(arrayHashtags, arrayHashtags[i]) > 1) {
          hashtagsInput.setCustomValidity('Нельзя, чтобы хештеги повторялись');
        } else if (arrayHashtags[i].length > HASHTAGS_MAX_LENGTH) {
          hashtagsInput.setCustomValidity('Количество символов в хештеге (включая "#") должно быть не больше ' + HASHTAGS_MAX_LENGTH);
        } else {
          hashtagsInput.setCustomValidity('');
        }
      }

      if (arrayHashtags.length > HASHTAGS_MAX_NUMBER) {
        hashtagsInput.setCustomValidity('Количество хештегов должно быть не больше ' + HASHTAGS_MAX_NUMBER);
      }
    } else {
      hashtagsInput.setCustomValidity('');
    }

    hashtagsInputValidation();
  };
  var onPictureEditorClose = function () {
    pictureUpload.value = '';
    picturePreview.style.transform = '';
    pictureEditor.classList.add('hidden');
    document.removeEventListener('keydown', onPictureEditorEscPressed);
    pictureEditorCloseButton.removeEventListener('click', onPictureEditorClose);
    sizeUpButton.removeEventListener('click', onSizeUpButtonPressed);
    sizeDownButton.removeEventListener('click', onSizeDownButtonPressed);
    pictureEffects.forEach(function (element) {
      element.removeEventListener('click', onEffectPressed);
    });
    hashtagsInput.removeEventListener('focus', onHashtagsInputFocus);
    hashtagsInput.removeEventListener('blur', onHashtagsInputBlur);
    commentInput.removeEventListener('focus', onCommentInputFocus);
    commentInput.removeEventListener('blur', onCommentInputBlur);
    uploadSubmitButton.removeEventListener('click', onFormSubmit);
    sliderOfEffectIntensity.removeEventListener('mousedown', onSliderMouseDown);
    EFFECT_CLASSES.forEach(function (element) {
      if (picturePreview.classList.contains(element)) {
        picturePreview.classList.remove(element);
      }
    });
  };
  var onPictureEditorEscPressed = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onPictureEditorClose();
    }
  };
  var onHashtagsInputFocus = function () {
    document.removeEventListener('keydown', onPictureEditorEscPressed);
  };
  var onHashtagsInputBlur = function () {
    document.addEventListener('keydown', onPictureEditorEscPressed);
  };
  var onCommentInputFocus = function () {
    document.removeEventListener('keydown', onPictureEditorEscPressed);
  };
  var onCommentInputBlur = function () {
    document.addEventListener('keydown', onPictureEditorEscPressed);
  };

  pictureEditor.classList.remove('hidden');
  pictureEffects.forEach(function (element) {
    element.addEventListener('click', onEffectPressed);
  });
  document.addEventListener('keydown', onPictureEditorEscPressed);
  pictureEditorCloseButton.addEventListener('click', onPictureEditorClose);
  sizeInput.value = MAX_SIZE_OF_PICTURE_PREVIEW + '%';
  sizeUpButton.addEventListener('click', onSizeUpButtonPressed);
  sizeDownButton.addEventListener('click', onSizeDownButtonPressed);
  hashtagsInput.addEventListener('focus', onHashtagsInputFocus);
  hashtagsInput.addEventListener('blur', onHashtagsInputBlur);
  commentInput.addEventListener('focus', onCommentInputFocus);
  commentInput.addEventListener('blur', onCommentInputBlur);
  uploadSubmitButton.addEventListener('click', onFormSubmit);
  sliderOfEffectIntensity.addEventListener('mousedown', onSliderMouseDown);
  picturePreview.classList.add(ORIGINAL_PICTURE_CLASS);
  lineWidth = sliderLine.offsetWidth;
  setDelaultOfEffect();
  changeDisplayOfSlider();
};

pasteUsersPictures();
commentCount.classList.add('visually-hidden');
commentLoadMore.classList.add('visually-hidden');
pictureUpload.addEventListener('change', onPictureUploadChange);
