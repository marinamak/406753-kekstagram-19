'use strict';

var PICTURES_NUMBER = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var STEP_SCALE = 25;
var SOCIAL_PICTURE_WIDTH = 35;
var SOCIAL_PICTURE_HEIGHT = 35;
var MAX_HASHTAGS_COUNT = 5;
var MAX_HASHTAG_LENGTH = 20;
var ESC_KEY = 'Escape';

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
    photoComments = photoComments + getRandomValueFromArray(messages) + ' ';
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

var renderComments = function (arrComments) {
  var fragmentComments = document.createDocumentFragment();

  for (var i = 0; i < arrComments.length; i++) {
    var newSocialComment = socialComments.querySelector('.social__comment').cloneNode(true);

    newSocialComment.querySelector('.social__picture').src = arrComments[i].avatar;
    newSocialComment.querySelector('.social__picture').alt = arrComments[i].name;
    newSocialComment.querySelector('.social__picture').width = SOCIAL_PICTURE_WIDTH;
    newSocialComment.querySelector('.social__picture').height = SOCIAL_PICTURE_HEIGHT;
    newSocialComment.querySelector('.social__text').textContent = arrComments[i].message;
    fragmentComments.appendChild(newSocialComment);
  }

  socialComments.appendChild(fragmentComments);
};

var renderBigPicture = function (picture) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPictureCommentCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length - 1;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  renderComments(picture.comments);
};

// renderBigPicture(pictures[0]);

// ------- Загрузка изображения и открытие/закрытие формы редактирования ------
var imgUpload = document.querySelector('.img-upload');
var uploadFile = imgUpload.querySelector('#upload-file');
var imgEditor = imgUpload.querySelector('.img-upload__overlay');
var uploadCancel = imgEditor.querySelector('#upload-cancel');

var onEditorEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeEditor();
  }
};

var openPhotoEditor = function () {
  imgEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEditorEscPress);
};

var closeEditor = function () {
  imgEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditorEscPress);
  uploadFile.value = '';
};

uploadFile.addEventListener('change', function () {
  openPhotoEditor();
});

uploadCancel.addEventListener('click', function () {
  closeEditor();
});

// ----- Размер изображения ------
var scaleControlSmaller = imgEditor.querySelector('.scale__control--smaller');
var scaleControlBigger = imgEditor.querySelector('.scale__control--bigger');
var scaleControlValue = imgEditor.querySelector('.scale__control--value');
var imgPreview = imgEditor.querySelector('.img-upload__preview img');
scaleControlValue.value = '100%';

var increaseScale = function () {
  var currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale < MAX_SCALE) {
    scaleControlValue.value = (currentScale + STEP_SCALE) + '%';
    currentScale = parseInt(scaleControlValue.value, 10);
    resizeImg(currentScale);
  }
};

var decreaseScale = function () {
  var currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale > MIN_SCALE) {
    scaleControlValue.value = (currentScale - STEP_SCALE) + '%';
    currentScale = parseInt(scaleControlValue.value, 10);
    resizeImg(currentScale);
  }
};

var resizeImg = function (scaleImg) {
  if (scaleImg !== MAX_SCALE) {
    imgPreview.style.transform = 'scale(0.' + scaleImg + ')';
  } else {
    imgPreview.style.transform = 'none';
  }
};

scaleControlSmaller.addEventListener('click', decreaseScale);
scaleControlBigger.addEventListener('click', increaseScale);

// --------Наложение эффекта на изображение ---------
var effects = imgEditor.querySelector('.effects');
var effectLevel = imgEditor.querySelector('.effect-level');
var effectPin = effectLevel.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
var effectLevelValue = effectLevel.querySelector('.effect-level__value');

effectPin.style.left = '100%';
effectLevel.classList.add('hidden');

var clearEffect = function () {
  imgPreview.removeAttribute('class');
  effectLevel.classList.add('hidden');
};

var addEffect = function (evt) {
  var effectName = evt.target.value;
  clearEffect();

  if (effectName !== 'none') {
    imgPreview.classList.add('effects__preview--' + effectName);
    effectLevel.classList.remove('hidden');
  }
  changeEffectLevelDepth();
};

var getEffectLevelDepth = function () {
  var levelDepth = parseInt(effectPin.style.left, 10);

  return levelDepth;
};

var changeEffectLevelDepth = function () {
  effectLevelDepth.style.width = getEffectLevelDepth() + '%';
  effectLevelValue.value = getEffectLevelDepth();
};

var oneffectLevelPinMouseDown = function () {

};

var oneffectLevelPinMouseUp = function () {

};

effectPin.addEventListener('mousedown', oneffectLevelPinMouseDown);
effectPin.addEventListener('mouseup', oneffectLevelPinMouseUp);
effects.addEventListener('click', addEffect);

// ------ Валидация хеш-тегов ------
var hashtagsInput = imgEditor.querySelector('.text__hashtags');

var findDuplicates = function (items) {
  var isDublicate = false;
  var currentItem = '';
  if (items.length > 1) {
    for (var i = 0; i < items.length; i++) {
      currentItem = items[i];
      for (var j = i + 1; j < items.length; j++) {
        if (currentItem.toLocaleLowerCase() === items[j].toLocaleLowerCase()) {
          isDublicate = true;
        }
      }
    }
  }
  return isDublicate;
};

var validateHashtags = function () {
  var hashtags = hashtagsInput.value.split(' ');
  var errorMessage = '';
  var isvalid = true;

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    errorMessage += 'Нельзя указывать больше пяти хэш-тегов. ';
    isvalid = false;
  } else if (findDuplicates(hashtags)) {
    errorMessage += 'Один и тот же хэш-тег не может быть использован дважды. ';
  } else {
    hashtags.forEach(function (hashtag) {
      if (hashtag.length > MAX_HASHTAG_LENGTH) {
        errorMessage += 'Максимальная длина одного хэш-тега 20 символов, включая решётку. ';
        isvalid = false;
      } else if (hashtag === '#') {
        errorMessage += 'Хеш-тег не может состоять только из одной решётки. ';
        isvalid = false;
      } else if (hashtag.charAt(0) !== '#') {
        errorMessage += 'Хэш-тег должен начинаться с символа # (решётка). ';
        isvalid = false;
      } else if (/[^a-zA-Z0-9]/.test(hashtag.slice(1, (hashtag.length - 1)))) {
        errorMessage += 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д. ';
      }
    });
  }
  hashtagsInput.setCustomValidity(errorMessage);
  return isvalid;
};
hashtagsInput.addEventListener('input', validateHashtags);
