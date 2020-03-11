'use strict';

(function () {
  var filterForm = document.querySelector('.img-filters__form');
  var filterButtons = filterForm.querySelectorAll('.img-filters__button');

  var deletePictures = function () {
    var pictures = document.querySelectorAll('.picture');
    for (var i = 0; i < pictures.length; i++) {
      pictures[i].remove();
    }
  };

  var defaultPhotos = function () {
    return window.photos;
  };

  var randomPhotos = function (arr) {
    var randomArray = [];
    for (var i = 0; i < 10; i++) {
      var index = window.util.getRandomInt(0, arr.length);
      randomArray.push(arr[index]);
      arr.splice(index, 1);
    }
    return randomArray;
  };

  var sortPhotos = function (arr) {
    return arr.sort(function (comment1, comment2) {
      return comment2.comments.length - comment1.comments.length;
    });
  };

  var changeFilter = window.debounce(function (cb) {
    var arrayCopy = window.photos.slice();
    var data = cb(arrayCopy);
    deletePictures();
    window.render.appendPicture(data);
    window.filterPictures = data;
  });


  var addActiveButton = function (evt) {
    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
  };

  filterForm.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      var id = evt.target.getAttribute('id');
      switch (id) {
        case 'filter-random':
          changeFilter(randomPhotos);
          break;
        case 'filter-discussed':
          changeFilter(sortPhotos);
          break;
        default:
          changeFilter(defaultPhotos);
          break;
      }
      addActiveButton(evt);
    }
  });
})();
