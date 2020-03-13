'use strict';
(function () {
  var imgFilters = document.querySelector('.img-filters');
  var filterForm = document.querySelector('.img-filters__form');
  var currentFilter = 'default';
  var RANDOM_NUMBER = 10;

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
    for (var i = 0; i < RANDOM_NUMBER; i++) {
      var index = window.util.getRandomInt(0, arr.length);
      randomArray.push(arr[index]);
      arr.splice(index, 1);
    }
    return randomArray;
  };

  var sortPhotos = function (arr) {
    return arr.sort(function (first, second) {
      if (first.comments.length > second.comments.length) {
        return -1;
      } else if (first.comments.length < second.comments.length) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  var applyFilter = window.debounce(function (cb) {
    var arrayCopy = window.photos.slice();
    var data = cb(arrayCopy);
    deletePictures();
    window.render.appendPicture(data);
    window.filterPictures = data;
  });

  filterForm.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('img-filters__button')) {
      var currentFilterButton = imgFilters.querySelector('#filter-' + currentFilter);
      currentFilterButton.classList.remove('img-filters__button--active');
      currentFilterButton.disabled = false;

      evt.target.classList.add('img-filters__button--active');
      evt.target.disabled = true;

      switch (evt.target.id.split('-')[1]) {
        case 'random':
          applyFilter(randomPhotos);
          break;
        case 'discussed':
          applyFilter(sortPhotos);
          break;
        case 'default':
          applyFilter(defaultPhotos);
          break;
        default:
          applyFilter(defaultPhotos);
      }
      currentFilter = evt.target.id.split('-')[1];
    }
  });
})();
