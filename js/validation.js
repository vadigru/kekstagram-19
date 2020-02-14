'use strict';
(function () {
  var MAX_HASHTAG_COUNT = 5;
  // hashtags validation --------------------------------------------------------
  // check if hashtag is empty ------------------------------------------------
  var isHashtagEmpty = function (arr) {
    var result = false;
    arr.forEach(function (item) {
      if (item.charAt(0) === '#' && item.length === 1) {
        result = true;
      }
    });
    return result;
  };

  // check if hashtag isn't too long ------------------------------------------
  var isHashtagTooLong = function (arr) {
    var result = false;
    arr.forEach(function (item) {
      if (item.length > 20) {
        result = true;
      }
    });
    return result;
  };

  // check if same hashtags are enetred ---------------------------------------
  var isSimilarElement = function (arr) {
    var result = false;
    var lowercaseArr = arr.map(function (item) {
      return item.toLowerCase();
    });
    lowercaseArr.forEach(function (item, i) {
      if (lowercaseArr.indexOf(item, i + 1) > -1 && item !== '') {
        result = true;
      }
    });
    return result;
  };

  // check if hashtag have special characters ---------------------------------
  var isSpecialCharacter = function (arr) {
    var allowedSymbols = /^[#][\W\w]+$/;
    var result = false;
    arr.forEach(function (item) {
      if (!item.match(allowedSymbols)) {
        result = true;
      }
    });
    return result;
  };

  // check if none of hashtags presents ---------------------------------------
  var isHashtagPresent = function (arr) {
    var result = false;
    if (arr.length === 1 && arr[0] === '') {
      result = true;
    }
    return result;
  };

  // hashtag errors handler ---------------------------------------------------
  var onSubmitButtonClick = function () {
    var pictureHashtag = document.querySelector('.text__hashtags');
    var hashtags = pictureHashtag.value.split(' ');
    if (isHashtagEmpty(hashtags)) {
      pictureHashtag.setCustomValidity('Хэш-тег не может быть пустым.');
    } else if (!isHashtagPresent(hashtags) && isSpecialCharacter(hashtags)) {
      pictureHashtag.setCustomValidity('Хэш-тег должен начинаться с "#" и ' +
                                      'не может содержать пробелы, спецсимволы, ' +
                                      'символы пунктуации и т.д.');
    } else if (isSimilarElement(hashtags)) {
      pictureHashtag.setCustomValidity('Хэш-теги не могут быть одинаковыми.');
    } else if (isHashtagTooLong(hashtags)) {
      pictureHashtag.setCustomValidity('Слишком длинный хэш-тег. ' +
                                      'Максимальная длина хэш-тега 20 символов.');
    } else if (hashtags.length > MAX_HASHTAG_COUNT) {
      pictureHashtag.setCustomValidity('Введенных хэш-тегов ' + hashtags.length +
                                      '. ' + 'Максимальная количество хэш-тегов "' + MAX_HASHTAG_COUNT + '".');
    } else {
      pictureHashtag.setCustomValidity('');
    }
  };

  window.validation = {
    onSubmitButtonClick: onSubmitButtonClick
  };
})();
