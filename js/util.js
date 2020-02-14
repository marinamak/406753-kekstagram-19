'use strict';
(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEY) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEY) {
      action();
    }
  };

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
  };

  var getRandomValueFromArray = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomInt: getRandomInt,
    getRandomValueFromArray: getRandomValueFromArray
  };
})();
