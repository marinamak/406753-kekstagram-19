'use strict';
(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;
  // ------- Загрузка изображения и открытие/закрытие формы редактирования ------
  var imgUpload = document.querySelector('.img-upload');
  var uploadFile = imgUpload.querySelector('#upload-file');
  var imgEditor = imgUpload.querySelector('.img-upload__overlay');
  var uploadCancel = imgEditor.querySelector('#upload-cancel');
  var scaleControlSmaller = imgEditor.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgEditor.querySelector('.scale__control--bigger');
  var scaleControlValue = imgEditor.querySelector('.scale__control--value');
  var imgPreview = imgEditor.querySelector('.img-upload__preview img');
  var hashtagsInput = imgEditor.querySelector('.text__hashtags');
  var commentTextarea = imgEditor.querySelector('.text__description');

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
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');

  effectPin.style.left = '100%';
  effectLevel.classList.add('hidden');

  var clearEffect = function () {
    imgPreview.removeAttribute('class');
    effectLevel.classList.add('hidden');
  };

  var addEffect = function (evt) {
    var effectName = evt.target.value;
    clearEffect();

    if (effectName !== 'none') {
      imgPreview.classList.add('effects__preview--' + effectName);
      effectLevel.classList.remove('hidden');
    }
    changeEffectLevelDepth();
  };

  var getEffectLevelDepth = function () {
    var levelDepth = parseInt(effectPin.style.left, 10);

    return levelDepth;
  };

  var changeEffectLevelDepth = function () {
    effectLevelDepth.style.width = getEffectLevelDepth() + '%';
    effectLevelValue.value = getEffectLevelDepth();
  };

  var oneffectLevelPinMouseDown = function () {

  };

  var oneffectLevelPinMouseUp = function () {

  };

  effectPin.addEventListener('mousedown', oneffectLevelPinMouseDown);
  effectPin.addEventListener('mouseup', oneffectLevelPinMouseUp);
  effects.addEventListener('click', addEffect);
})();
