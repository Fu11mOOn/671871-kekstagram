'use strict';

(function () {
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

  window.data = function () {
    var usersPictures = [];

    var generateUserComments = function (array) {
      for (var i = 0; i < 2; i++) {
        array.comments[i] = [];

        for (var j = 0; j < window.utilits.getRandomIntegerFromInterval(1, 3); j++) {
          array.comments[i] += COMMENTS_LIST[window.utilits.getRandomIntegerFromInterval(0, COMMENTS_LIST.length)] + ' ';
        }
      }
    };

    for (var i = 0; i < NUMBER_OF_PICTURES; i++) {
      usersPictures[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.utilits.getRandomIntegerFromInterval(15, 201),
        comments: [],
        description: DESCRIPTIONS_LIST[window.utilits.getRandomIntegerFromInterval(0, DESCRIPTIONS_LIST.length)]
      };

      generateUserComments(usersPictures[i]);
    }

    return usersPictures;
  };
}());
