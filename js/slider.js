'use strict';

(function () {
  var imgUpload = document.querySelector('.img-upload');
  var imgEditor = imgUpload.querySelector('.img-upload__overlay');
  var effectPin = imgEditor.querySelector('.effect-level__pin');
  var effectLevelDepth = imgEditor.querySelector('.effect-level__depth');
  var effectLevelValue = imgEditor.querySelector('.effect-level__value');

  function getElemCoords(elem) {
    var rect = elem.getBoundingClientRect();

    return {
      top: rect.top,
      left: rect.left
    };
  }

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var lineWidth = getComputedStyle(evt.target.parentNode).width;
    var effectLeft = getElemCoords(evt.target.parentNode).left;
    var effectLevel;

    var moveMouseHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var pinValue = moveEvt.clientX - effectLeft;
      if (pinValue < 0) {
        effectLevel = 0;
      } else if (pinValue > parseInt(lineWidth, 10)) {
        effectLevel = 1;
      } else {
        effectLevel = pinValue / parseInt(lineWidth, 10);
      }

      var effectLevelRounded = Math.round(effectLevel * 100);

      effectLevelValue.value = effectLevelRounded;
      effectPin.style.left = effectLevelRounded + '%';
      effectLevelDepth.style.width = effectLevelRounded + '%';
      window.form.changeEffectValue(effectLevel);
    };

    var moveMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', moveMouseHandler);
      document.removeEventListener('mouseup', moveMouseUpHandler);
    };

    document.addEventListener('mousemove', moveMouseHandler);
    document.addEventListener('mouseup', moveMouseUpHandler);
  });
})();
