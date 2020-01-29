'use strict';

var PICTURES_NUMBER = 25;
var LIKES_NUMBER_MIN = 15;
var LIKES_NUMBER_MAX = 200;

var commentatorNames = ['Иван', 'Сергей', 'Мария', 'Виктор', 'Юлия', 'Полина', 'Ксения', 'Дмитрий'];

var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
};

var getRandomValueFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomComment = function () {
  var randCommentCount = getRandomInt(1, 2);
  var photoComments = [];
  var i = 1;
  while (i <= randCommentCount) {
    photoComments = photoComments + getRandomValueFromArray(messages);
    i++;
  }
  return photoComments;
};

var createComment = function () {
  var commentBlocks = [];
  for (var i = 0; i <= 1; i++) {
    var comment = {};
    comment.avatar = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
    comment.message = getRandomComment();
    comment.name = getRandomValueFromArray(commentatorNames);
    commentBlocks.push(comment);
  }
  return commentBlocks;
};

var createPhoto = function (picNum) {
  var pictures = [];
  for (var i = 0; i <= picNum - 1; i++) {
    var picture = {};
    picture.url = 'photos/' + (i + 1) + '.jpg';
    picture.description = 'Описание фотографии';
    picture.likes = getRandomInt(LIKES_NUMBER_MIN, LIKES_NUMBER_MAX);
    picture.comments = createComment();
    pictures.push(picture);
  }
  return pictures;
};

var pictures = createPhoto(PICTURES_NUMBER);

var picturesContainer = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture').content;

var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var renderSimilarPictures = function (picturesArray) {
  var similarPicturesElement = document.createDocumentFragment();
  for (var i = 0; i < picturesArray.length; i++) {
    similarPicturesElement.appendChild(renderPicture(picturesArray[i]));
  }
  picturesContainer.appendChild(similarPicturesElement);
};

renderSimilarPictures(pictures);
