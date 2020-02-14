'use strict';
(function () {
  var MAX_HASHTAGS_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  // ------ Валидация хеш-тегов ------
  var imgUpload = document.querySelector('.img-upload');
  var imgEditor = imgUpload.querySelector('.img-upload__overlay');
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
})();
