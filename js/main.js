'use strict';

var PICTURES_NUMBER = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;

var commentatorsNames = ['Иван', 'Сергей', 'Мария', 'Виктор', 'Юлия', 'Полина', 'Ксения', 'Дмитрий'];

var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// ------ Функция получения случайного числа в заданном интервале ---------
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
};
// ------ Функция получения случайного числа из заданного массива -------
var getRandomValueFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// ------ Формирование случайного комментария ------
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

// ------ Функция формирования комментариев -----
var createComment = function () {
  var commentBlocks = [];
  var numberComments = getRandomInt(1, 6);
  for (var i = 0; i <= numberComments; i++) {
    var comment = {};
    comment.avatar = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
    comment.message = getRandomComment();
    comment.name = commentatorsNames[getRandomInt(0, commentatorsNames.length - 1)];
    commentBlocks.push(comment);
  }
  return commentBlocks;
};

// ------ Формирование массива фотографий ------
var createPhoto = function (picNum) {
  var pictures = [];
  for (var i = 0; i <= picNum - 1; i++) {
    var picture = {};
    picture.url = 'photos/' + (i + 1) + '.jpg';
    picture.description = 'Описание фотографии';
    picture.likes = getRandomInt(MIN_LIKES, MAX_LIKES);
    picture.comments = createComment();
    pictures.push(picture);
  }
  return pictures;
};

var pictures = createPhoto(PICTURES_NUMBER);

// --------Показ изображений других пользователей--------
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

// --------Показ изображения в полноразмерном режиме--------
var socialComments = document.querySelector('.social__comments');
var bigPictureCommentCount = document.querySelector('.social__comment-count');
var bigPictureCommentsLoader = document.querySelector('.comments-loader');
bigPictureCommentCount.classList.add('hidden');
bigPictureCommentsLoader.classList.add('hidden');
document.body.classList.add('modal-open');

var renderComments = function (commentsArr) {
  var fragmentComments = document.createDocumentFragment();

  for (var i = 0; i < commentsArr.length; i++) {
    var newSocialComment = socialComments.querySelector('.social__comment').cloneNode(true);

    newSocialComment.querySelector('.social__picture').src = commentsArr[i].avatar;
    newSocialComment.querySelector('.social__picture').alt = commentsArr[i].name;
    newSocialComment.querySelector('.social__picture').width = '35';
    newSocialComment.querySelector('.social__picture').height = '35';
    newSocialComment.querySelector('.social__text').textContent = commentsArr[i].message;
    fragmentComments.appendChild(newSocialComment);
  }

  socialComments.innerHTML = '';
  socialComments.appendChild(fragmentComments);
};

var renderBigPicture = function (picture) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length - 1;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  renderComments(picture.comments);
};

renderBigPicture(pictures[0]);
