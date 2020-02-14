'use strict';
(function () {
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

  renderSimilarPictures(window.data.pictures);
})();
