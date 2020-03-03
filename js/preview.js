'use strict';
(function () {
  var SOCIAL_PICTURE_WIDTH = 35;
  var SOCIAL_PICTURE_HEIGHT = 35;
  var ESC_BTN = 'Escape';
  var ENTER_BTN = 'Enter';
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var pictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureCommentCount = document.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = document.querySelector('.comments-loader');

  // --------Показ изображения в полноразмерном режиме--------
  var renderComment = function (commentElement) {
    var newSocialComment = document.querySelector('.social__comment').cloneNode(true);
    newSocialComment.querySelector('.social__picture').setAttribute('src', commentElement.avatar);
    newSocialComment.querySelector('.social__picture').setAttribute('alt', commentElement.name);
    newSocialComment.querySelector('.social__picture').width = SOCIAL_PICTURE_WIDTH;
    newSocialComment.querySelector('.social__picture').height = SOCIAL_PICTURE_HEIGHT;
    newSocialComment.querySelector('.social__text').textContent = commentElement.message;
    return newSocialComment;
  };

  var generateCommentsFragment = function (arr) {
    var fragmentComments = document.createDocumentFragment();
    var socialComments = document.querySelector('.social__comments').cloneNode();
    for (var i = 0; i < arr.length; i++) {
      socialComments.appendChild(renderComment(arr[i]));
    }
    fragmentComments.appendChild(socialComments);
    return fragmentComments;
  };

  var renderBigPicture = function (picture) {

    bigPicture.classList.remove('hidden');
    bigPictureCommentCount.classList.add('hidden');
    bigPictureCommentsLoader.classList.add('hidden');
    document.body.classList.add('modal-open');

    bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length - 1;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.querySelector('.social__comments').parentNode
    .replaceChild(generateCommentsFragment(picture.comments), bigPicture.querySelector('.social__comments'));
  };

  var showBigPictureHandler = function (evt) {
    if (evt.target.parentNode.classList.contains('picture')) {
      var elementNum = evt.target.parentNode.getAttribute('data-num');
      renderBigPicture(window.data.smallPhotos[elementNum]);
      document.addEventListener('keydown', closeBigPictureHandler);
    }
  };

  var showBigPictureEnterHandler = function (evt) {
    var isBigPictureFocused = (document.activeElement.classList.contains('picture'));
    if (evt.key === ENTER_BTN && isBigPictureFocused) {
      var elementNum = document.activeElement.getAttribute('data-num');
      renderBigPicture(window.data.smallPhotos[elementNum]);
      document.addEventListener('keydown', closeBigPictureHandler);
    }
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('click', closeBigPictureHandler);
  };

  var closeBigPictureHandler = function (evt) {
    var isBigPictureCommentFocused = (document.activeElement === bigPicture.querySelector('.social__footer-text'));
    if (evt.key === ESC_BTN && !isBigPictureCommentFocused) {
      closeBigPicture();
    }
  };

  pictures.addEventListener('click', showBigPictureHandler);
  pictureCancel.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', showBigPictureEnterHandler);
})();
