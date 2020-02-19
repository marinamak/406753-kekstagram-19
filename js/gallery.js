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

  // var renderSimilarPictures = function (picturesArray) {
  //   var similarPicturesElement = document.createDocumentFragment();
  //   for (var i = 0; i < picturesArray.length; i++) {
  //     similarPicturesElement.appendChild(renderPicture(picturesArray[i]));
  //   }
  //   picturesContainer.appendChild(similarPicturesElement);
  // };

  // renderSimilarPictures(window.data.pictures);

  var successHandler = function (picturesArray) {
    var similarPicturesElement = document.createDocumentFragment();

    for (var i = 0; i < picturesArray.length; i++) {
      similarPicturesElement.appendChild(renderPicture(picturesArray[i]));
    }
    picturesContainer.appendChild(similarPicturesElement);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
})();
