'use strict';
(function () {
  var PICTURES_NUMBER = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  var COMMENTATORSNAMES = ['Иван', 'Сергей', 'Мария', 'Виктор', 'Юлия', 'Полина', 'Ксения', 'Дмитрий'];

  var MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var getRandomComment = function () {
    var randCommentCount = window.util.getRandomInt(1, 2);
    var photoComments = [];
    var i = 1;
    while (i <= randCommentCount) {
      photoComments = photoComments + window.util.getRandomValueFromArray(MESSAGES) + ' ';
      i++;
    }
    return photoComments;
  };

  var createComment = function () {
    var commentBlocks = [];
    var numberComments = window.util.getRandomInt(1, 100);
    for (var i = 0; i <= numberComments; i++) {
      var comment = {};
      comment.avatar = 'img/avatar-' + window.util.getRandomInt(1, 6) + '.svg';
      comment.message = getRandomComment();
      comment.name = COMMENTATORSNAMES[window.util.getRandomInt(0, COMMENTATORSNAMES.length - 1)];
      commentBlocks.push(comment);
    }
    return commentBlocks;
  };

  var createPhoto = function (picNum) {
    var photos = [];
    for (var i = 0; i <= picNum - 1; i++) {
      var picture = {};
      picture.url = 'photos/' + (i + 1) + '.jpg';
      picture.description = 'Описание фотографии';
      picture.likes = window.util.getRandomInt(MIN_LIKES, MAX_LIKES);
      picture.comments = createComment();
      photos.push(picture);
    }
    return photos;
  };

  var photos = createPhoto(PICTURES_NUMBER);

  window.data = {
    smallPhotos: photos
  };
})();
