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
var NUMBER_OF_PICTURES = 25;
var ELEMENT_NUMBER = 0;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var generateUsersPictures = function (descriptionsList, commentsList, numberOfPictures) {
  var usersPictures = [];

  var generateUsersComments = function () {
    for (var j = 0; j < getRandomNumber(1, 3); j++) {
      usersPictures[i].comments[j] = commentsList[getRandomNumber(0, commentsList.length)];
    }
  };

  for (var i = 0; i < numberOfPictures; i++) {
    usersPictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(15, 201),
      comments: [],
      description: descriptionsList[getRandomNumber(0, descriptionsList.length)]
    };

    generateUsersComments();
  }

  return usersPictures;
};
var renderUsersPicture = function (usersPicture) {
  var usersPicturesElement = document.querySelector('#picture').content.cloneNode(true);

  usersPicturesElement.querySelector('.picture__link').href = usersPicture.url;
  usersPicturesElement.querySelector('.picture__img').src = usersPicture.url;
  usersPicturesElement.querySelector('.picture__stat--likes').textContent = usersPicture.likes;
  usersPicturesElement.querySelector('.picture__stat--comments').textContent = usersPicture.comments.length;

  return usersPicturesElement;
};
var pasteUsersPictures = function (array) {
  var usersPicturesList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderUsersPicture(usersPictures[i]));
  }

  usersPicturesList.appendChild(fragment);
};
var renderBigPicture = function (array, elementNumber) {
  var bigPicture = document.querySelector('.big-picture');
  var commentTemplate = document.querySelector('.social__comment').cloneNode(true);
  var imageElement = commentTemplate.querySelector('.social__picture');
  var commentsList = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();

  // Здесь я решил это в функцию занести, чтобы по названию было понятнее, что там происходит. В правильном направлении мыслю? И если в функции есть функция, то нужные для нее переменные (при условии, что после нее они не используются) лучше писать в ней или в функции, которая ее содержит?
  var renderBigPictureComments = function () {
    commentTemplate.classList.add('social__comment--text');

    for (var i = 0; i < array[elementNumber].comments.length; i++) {
      imageElement.src = 'img/avatar-' + getRandomNumber(1, 7) + '.svg';
      commentTemplate.textContent = array[elementNumber].comments[i];
      commentTemplate.insertBefore(imageElement, commentTemplate.firstChild);
      // Здесь почему-то сommentTemplate не добавляется в конец fragment, а перезаписвает его, если итерации больше одной
      fragment.appendChild(commentTemplate);
    }

    commentsList.appendChild(fragment);
  };

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img > img').src = array[elementNumber].url;
  bigPicture.querySelector('.likes-count').textContent = array[elementNumber].likes;
  bigPicture.querySelector('.comments-count').textContent = array[elementNumber].comments.length;
  bigPicture.querySelector('.social__caption').textContent = array[elementNumber].description;

  renderBigPictureComments();

  return bigPicture;
};

var usersPictures = generateUsersPictures(DESCRIPTIONS_LIST, COMMENTS_LIST, NUMBER_OF_PICTURES);
var commentCount = document.querySelector('.social__comment-count');
var commentLoadMore = document.querySelector('.social__loadmore');

pasteUsersPictures(usersPictures);
renderBigPicture(usersPictures, ELEMENT_NUMBER);

commentCount.classList.add('visually-hidden');
commentLoadMore.classList.add('visually-hidden');
