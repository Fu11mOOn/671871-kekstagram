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
var EFFECTS_CLASS_LIST = [
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

    userPictureTemplate.querySelector('.picture__link').href = element.url;
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
var openFullscreenPictureWhenPressed = function (arrayWithUsersPictures) {
  var usersPicturesLinks = document.querySelectorAll('.picture__link');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseButton = document.querySelector('.big-picture__cancel');

  var renderBigPicture = function (element, arrayElement) {
    element.addEventListener('click', function (evt) {
      if (evt.currentTarget === element) {

        var renderBigPictureComments = function () {
          var commentsList = document.querySelector('.social__comments');
          var fragment = document.createDocumentFragment();

          var removePreviousComments = function () {
            while (commentsList.children.length) {
              commentsList.removeChild(commentsList.firstChild);
            }
          };

          for (var i = 0; i < arrayElement.comments.length; i++) {
            var commentTemplate = document.querySelector('.social__comment').cloneNode(true);
            var imageElement = commentTemplate.querySelector('.social__picture');

            commentTemplate.classList.add('social__comment--text');
            imageElement.src = 'img/avatar-' + getRandomIntegerFromInterval(1, 7) + '.svg';
            commentTemplate.textContent = arrayElement.comments[i];
            commentTemplate.insertBefore(imageElement, commentTemplate.firstChild);
            fragment.appendChild(commentTemplate);
          }

          removePreviousComments();
          commentsList.appendChild(fragment);
        };

        evt.preventDefault();
        bigPicture.classList.remove('hidden');
        bigPicture.querySelector('.big-picture__img > img').src = arrayElement.url;
        bigPicture.querySelector('.likes-count').textContent = arrayElement.likes;
        bigPicture.querySelector('.comments-count').textContent = arrayElement.comments.length;
        bigPicture.querySelector('.social__caption').textContent = arrayElement.description;

        renderBigPictureComments();
      }
    });
  };
  var onBigPictureClose = function () {
    bigPicture.classList.add('hidden');
  };

  for (var i = 0; i < usersPicturesLinks.length; i++) {
    renderBigPicture(usersPicturesLinks[i], arrayWithUsersPictures[i]);
  }

  bigPictureCloseButton.addEventListener('click', onBigPictureClose);
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onBigPictureClose();
    }
  });
};
var onPictureEditorClose = function () {
  pictureEditor.classList.add('hidden');
  pictureUpload.value = '';
};
var onPictureEditorEscPressed = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onPictureEditorClose();
  }
};
var impositionOfEffectOnPicture = function () {
  var picturePreview = document.querySelector('.img-upload__preview img');
  var pictureEffects = document.querySelectorAll('.effects__preview');
  var pictureEffectsInput = document.querySelectorAll('.effects__radio');

  var changeClassOfPicturePreviewWhenPressedOnEffect = function (element, input) {
    element.addEventListener('click', function () {
      var elementClasses = element.classList;

      for (var i = 0; i < elementClasses.length; i++) {
        if (EFFECTS_CLASS_LIST.indexOf(elementClasses[i]) !== -1) {
          var currentClass = elementClasses[i];

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

  for (var i = 0; i < pictureEffects.length; i++) {
    changeClassOfPicturePreviewWhenPressedOnEffect(pictureEffects[i], pictureEffectsInput);
  }
  changeEffectIntensity();
};

var usersPictures = generateUsersPictures(DESCRIPTIONS_LIST, COMMENTS_LIST, NUMBER_OF_PICTURES);
var commentCount = document.querySelector('.social__comment-count');
var commentLoadMore = document.querySelector('.social__loadmore');
var pictureUpload = document.querySelector('#upload-file');
var pictureEditor = document.querySelector('.img-upload__overlay');
var pictureEditorCloseButton = document.querySelector('.img-upload__cancel');

pasteUsersPictures(usersPictures);
openFullscreenPictureWhenPressed(usersPictures);
commentCount.classList.add('visually-hidden');
commentLoadMore.classList.add('visually-hidden');
pictureUpload.addEventListener('change', function () {
  pictureEditor.classList.remove('hidden');
  document.addEventListener('keydown', onPictureEditorEscPressed);
  impositionOfEffectOnPicture();
});
pictureEditorCloseButton.addEventListener('click', onPictureEditorClose);
