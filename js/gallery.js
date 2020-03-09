'use strict';
(function () {
  // --------Показ изображений других пользователей--------
  var pictureTemplate = document.querySelector('#picture').content.firstElementChild;
  var pictures = document.querySelector('.pictures');

  var renderPicture = function (pictureElement) {
    var pictureNode = pictureTemplate.cloneNode(true);
    pictureNode.querySelector('.picture__img').setAttribute('src', pictureElement.url);
    pictureNode.querySelector('.picture__likes').innerText = pictureElement.likes;
    pictureNode.querySelector('.picture__comments').innerText = pictureElement.comments.length;
    return pictureNode;
  };

  // var generatePictureFragment = function (arr) {
  //   var fragmentPicture = document.createDocumentFragment();
  //   for (var i = 0; i < arr.length; i++) {
  //     var pictureElement = renderPicture(arr[i]);
  //     pictureElement.setAttribute('data-num', i);
  //     fragmentPicture.appendChild(pictureElement);
  //   }
  //   return fragmentPicture;
  // };
  //
  // var appendPicture = function (fragment) {
  //   pictures.appendChild(fragment);
  // };
  //
  // var renderSimilarPictures = function (data) {
  //   appendPicture(generatePictureFragment(data));
  // };

  var successHandler = function (arr) {
    var fragmentPicture = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      var pictureElement = renderPicture(arr[i]);
      pictureElement.setAttribute('data-num', i);
      fragmentPicture.appendChild(pictureElement);
    }
    pictures.appendChild(fragmentPicture);
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

  // renderSimilarPictures(window.data.smallPhotos)

  window.backend.load(successHandler, errorHandler);
})();
