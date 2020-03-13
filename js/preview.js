'use strict';
(function () {
  var SOCIAL_PICTURE_WIDTH = 35;
  var SOCIAL_PICTURE_HEIGHT = 35;
  var ESC_BTN = 'Escape';
  var ENTER_BTN = 'Enter';
  var MAX_COMMENTS = 5;
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var pictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureCommentsLoader = document.querySelector('.comments-loader');

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
    var commentsLength = arr.length > MAX_COMMENTS ? MAX_COMMENTS : arr.length;
    var fragmentComments = document.createDocumentFragment();
    var socialComments = document.querySelector('.social__comments').cloneNode();
    for (var i = 0; i < commentsLength; i++) {
      socialComments.appendChild(renderComment(arr[i]));
    }
    fragmentComments.appendChild(socialComments);
    arr.splice(0, commentsLength);
    return fragmentComments;
  };

  var renderBigPicture = function (picture) {
    var commentsArray = picture.comments.slice();
    bigPictureCommentsLoader.removeEventListener('click', loadComments);
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    if (picture.comments.length <= MAX_COMMENTS) {
      bigPictureCommentsLoader.classList.add('hidden');
    } else {
      bigPictureCommentsLoader.classList.remove('hidden');
    }

    bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-showed').textContent = picture.comments.length > MAX_COMMENTS ? MAX_COMMENTS : picture.comments.length;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.querySelector('.social__comments').parentNode
    .replaceChild(generateCommentsFragment(commentsArray), bigPicture.querySelector('.social__comments'));

    var loadComments = function () {
      var commentsLength = commentsArray.length > MAX_COMMENTS ? MAX_COMMENTS : commentsArray.length;
      for (var i = 0; i < commentsLength; i++) {
        bigPicture.querySelector('.social__comments').appendChild(renderComment(commentsArray[i]));
      }
      bigPicture.querySelector('.comments-showed').innerText = +bigPicture.querySelector('.comments-showed').innerText + commentsLength;
      commentsArray.splice(0, commentsLength);
      if (commentsArray.length === 0) {
        bigPictureCommentsLoader.removeEventListener('click', loadComments);
        bigPictureCommentsLoader.classList.add('hidden');
      }
    };

    bigPictureCommentsLoader.addEventListener('click', loadComments);
  };

  var showBigPictureHandler = function (evt) {
    if (evt.target.parentNode.classList.contains('picture')) {
      var elementNum = evt.target.parentNode.getAttribute('data-num');
      renderBigPicture(window.filterPictures[elementNum]);
      document.addEventListener('keydown', closeBigPictureHandler);
    }
  };

  var showBigPictureEnterHandler = function (evt) {
    var isBigPictureFocused = (document.activeElement.classList.contains('picture'));
    if (evt.key === ENTER_BTN && isBigPictureFocused) {
      var elementNum = document.activeElement.getAttribute('data-num');
      renderBigPicture(window.filterPictures[elementNum]);
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
