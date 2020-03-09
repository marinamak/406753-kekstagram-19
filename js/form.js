'use strict';
(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;
  // ------- Загрузка изображения и открытие/закрытие формы редактирования ------
  var imgUpload = document.querySelector('.img-upload');
  var form = imgUpload.querySelector('.img-upload__form');
  var uploadFile = imgUpload.querySelector('#upload-file');
  var imgEditor = imgUpload.querySelector('.img-upload__overlay');
  var uploadCancel = imgEditor.querySelector('#upload-cancel');
  var scaleControlSmaller = imgEditor.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgEditor.querySelector('.scale__control--bigger');
  var scaleControlValue = imgEditor.querySelector('.scale__control--value');
  var imgPreview = imgEditor.querySelector('.img-upload__preview img');
  var hashtagsInput = imgEditor.querySelector('.text__hashtags');
  var commentTextarea = imgEditor.querySelector('.text__description');
  var successMessageTemplate = document.querySelector('#success').content.firstElementChild;
  var errorMessageTemplate = document.querySelector('#error').content.firstElementChild;
  var originalFilter = document.querySelector('#effect-none');

  var closeEditorEscHandler = function (evt) {
    var isHashtagsFocused = (document.activeElement === hashtagsInput);
    var isCommentFocused = (document.activeElement === commentTextarea);
    if (!isHashtagsFocused && !isCommentFocused) {
      window.util.isEscEvent(evt, closeEditor);
    }
  };

  var openPhotoEditor = function () {
    scaleControlValue.value = '100%';
    imgPreview.style.transform = 'scale(1)';
    imgEditor.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', closeEditorEscHandler);
  };

  var closeEditor = function () {
    imgEditor.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeEditorEscHandler);
    uploadFile.value = '';
    hashtagsInput.value = '';
    commentTextarea.value = '';
    clearEffect();
    originalFilter.checked = true;
  };

  uploadFile.addEventListener('change', function () {
    openPhotoEditor();
  });

  uploadCancel.addEventListener('click', function () {
    closeEditor();
  });

  // ----- Размер изображения ------
  var increaseScale = function () {
    var currentScale = parseInt(scaleControlValue.value, 10);
    if (currentScale < MAX_SCALE) {
      scaleControlValue.value = (currentScale + STEP_SCALE) + '%';
      currentScale = parseInt(scaleControlValue.value, 10);
      resizeImg(currentScale);
    }
  };

  var decreaseScale = function () {
    var currentScale = parseInt(scaleControlValue.value, 10);
    if (currentScale > MIN_SCALE) {
      scaleControlValue.value = (currentScale - STEP_SCALE) + '%';
      currentScale = parseInt(scaleControlValue.value, 10);
      resizeImg(currentScale);
    }
  };

  var resizeImg = function (scaleImg) {
    if (scaleImg !== MAX_SCALE) {
      imgPreview.style.transform = 'scale(0.' + scaleImg + ')';
    } else {
      imgPreview.style.transform = 'none';
    }
  };

  scaleControlSmaller.addEventListener('click', decreaseScale);
  scaleControlBigger.addEventListener('click', increaseScale);

  // --------Наложение эффекта на изображение ---------
  var effects = imgEditor.querySelector('.effects');
  var effectLevel = imgEditor.querySelector('.effect-level');
  var effectPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var imgUploadLabel = imgUpload.querySelector('.img-upload__label');

  var clearEffect = function () {
    imgPreview.removeAttribute('class');
    imgPreview.removeAttribute('style');
    effectPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    effectLevel.classList.add('hidden');
    scaleControlValue.value = '100%';
  };

  var addEffect = function (evt) {
    var effectName = evt.target.value;
    clearEffect();

    if (effectName !== 'none') {
      imgPreview.classList.add('effects__preview--' + effectName);
      effectLevel.classList.remove('hidden');
    }
  };

  effects.addEventListener('click', addEffect);
  imgUploadLabel.addEventListener('click', clearEffect);

  var changeEffectValue = function (value) {
    if (imgPreview.classList.contains('effects__preview--chrome')) {
      imgPreview.style.filter = 'grayscale(' + value + ')';
    } else if (imgPreview.classList.contains('effects__preview--sepia')) {
      imgPreview.style.filter = 'sepia(' + value + ')';
    } else if (imgPreview.classList.contains('effects__preview--marvin')) {
      imgPreview.style.filter = 'invert(' + value * 100 + '%)';
    } else if (imgPreview.classList.contains('effects__preview--phobos')) {
      imgPreview.style.filter = 'blur(' + value * 3 + 'px)';
    } else if (imgPreview.classList.contains('effects__preview--heat')) {
      imgPreview.style.filter = 'brightness(' + value * 3 + ')';
    }
  };

  var removeSuccesMessage = function (evt) {
    if (evt.target.classList.contains('success__button') || evt.target.classList.contains('success')) {
      document.querySelector('main').removeChild(successMessageTemplate);
      successMessageTemplate.removeEventListener('click', removeSuccesMessage);
    }
  };

  var removeEscMessage = function (evt) {
    window.util.isEscEvent(evt, function () {
      document.querySelector('main').removeChild(successMessageTemplate);
      document.removeEventListener('keydown', removeEscMessage);
    });
  };

  var removeErrorMessage = function (evt) {
    if (evt.target.classList.contains('error__button') || evt.target.classList.contains('error')) {
      document.querySelector('main').removeChild(errorMessageTemplate);
      successMessageTemplate.removeEventListener('click', removeErrorMessage);
    }
  };

  var removeEscMessageError = function (evt) {
    window.util.isEscEvent(evt, function () {
      document.querySelector('main').removeChild(errorMessageTemplate);
      document.removeEventListener('keydown', removeEscMessageError);
    });
  };

  var showSuccessMessage = function () {
    document.querySelector('main').appendChild(successMessageTemplate);
    successMessageTemplate.addEventListener('click', removeSuccesMessage);
    document.addEventListener('keydown', removeEscMessage);
  };

  var showErrorMessage = function () {
    document.querySelector('main').appendChild(errorMessageTemplate);
    errorMessageTemplate.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', removeEscMessageError);
  };

  var successSave = function () {
    closeEditor();
    showSuccessMessage();
  };

  var errorSave = function () {
    closeEditor();
    showErrorMessage();
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), successSave, errorSave);
  });

  window.form = {
    changeEffectValue: changeEffectValue
  };
})();
