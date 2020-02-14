'use strict';
(function () {
  var SOCIAL_PICTURE_WIDTH = 35;
  var SOCIAL_PICTURE_HEIGHT = 35;
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
})();
