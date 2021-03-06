'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture').content.firstElementChild;
  var pictures = document.querySelector('.pictures');

  var renderPicture = function (pictureElement) {
    var pictureNode = pictureTemplate.cloneNode(true);
    pictureNode.querySelector('.picture__img').src = pictureElement.url;
    pictureNode.querySelector('.picture__likes').textContent = pictureElement.likes;
    pictureNode.querySelector('.picture__comments').textContent = pictureElement.comments.length;
    return pictureNode;
  };

  var generatePictureFragment = function (arr) {
    var fragmentPicture = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var pictureElement = renderPicture(arr[i]);
      pictureElement.setAttribute('data-num', i);
      fragmentPicture.appendChild(pictureElement);
    }
    return fragmentPicture;
  };

  var appendPicture = function (data) {
    pictures.appendChild(generatePictureFragment(data));
  };

  window.render = {
    appendPicture: appendPicture
  };
})();
