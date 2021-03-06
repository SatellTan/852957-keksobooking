'use strict';

(function () {

  var MIN_BUNGALO_PRICE = 0;
  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;

  var form = document.querySelector('.ad-form');
  var timeInField = form.querySelector('#timein');
  var timeOutField = form.querySelector('#timeout');
  var typeOfHousingField = form.querySelector('#type');
  var priceInputField = form.querySelector('#price');
  var roomNumberField = form.querySelector('#room_number');
  var capacityField = form.querySelector('#capacity');
  var main = document.querySelector('main');

  var typesMap = {
    0: MIN_BUNGALO_PRICE,
    1: MIN_FLAT_PRICE,
    2: MIN_HOUSE_PRICE,
    3: MIN_PALACE_PRICE
  };

  var roomNumberMap = {
    0: [2],
    1: [1, 2],
    2: [0, 1, 2],
    3: [3]
  };

  var changeTimeOut = function () {
    timeInField.options[timeInField.selectedIndex].selected = false;
    timeInField.options[timeOutField.selectedIndex].selected = true;
  };

  var changeTimeIn = function () {
    timeOutField.options[timeOutField.selectedIndex].selected = false;
    timeOutField.options[timeInField.selectedIndex].selected = true;
  };

  var changeTypeOfHousing = function () {
    priceInputField.setAttribute('min', typesMap[typeOfHousingField.selectedIndex]);
    priceInputField.setAttribute('placeholder', typesMap[typeOfHousingField.selectedIndex]);
  };

  var changeRoomNumber = function () {
    for (var i = 0; i < capacityField.length; i++) {
      capacityField[i].disabled = true;
    }

    var unlockCapacityItems = function (selectedI) {
      var guestsNumber = roomNumberMap[selectedI];
      guestsNumber.forEach(function (item) {
        capacityField[item].disabled = false;
      });
    };

    unlockCapacityItems(roomNumberField.selectedIndex);

    capacityValidationCheck();
  };

  var capacityValidationCheck = function () {
    if (capacityField[capacityField.selectedIndex].disabled) {
      capacityField.setCustomValidity('В поле «Количество мест» установлено неверное значение');
    } else {
      capacityField.setCustomValidity('');
    }
  };

  timeOutField.addEventListener('change', changeTimeOut);
  timeInField.addEventListener('change', changeTimeIn);
  typeOfHousingField.addEventListener('change', changeTypeOfHousing);
  roomNumberField.addEventListener('change', changeRoomNumber);
  capacityField.addEventListener('change', capacityValidationCheck);

  priceInputField.addEventListener('input', function (evt) {
    if (evt.currentTarget.validity.rangeUnderflow) {
      evt.currentTarget.setCustomValidity('Для данного выбранного типа жилья цена не должна быть ниже ' + evt.currentTarget.min + ' руб.');
    } else {
      evt.currentTarget.setCustomValidity('');
    }
  });

  var onError = function () {
    var errorMessageNode = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var errorButton = errorMessageNode.querySelector('.error__button');

    main.insertBefore(errorMessageNode, main.firstChild);

    errorMessageNode.addEventListener('click', onMessageClick);

    var onErrorButtonClick = function (evt) {
      evt.currentTarget.removeEventListener('click', onErrorButtonClick);
      evt.currentTarget.remove();
    };

    errorButton.addEventListener('click', onErrorButtonClick);

    var onMessageEscPress = function (evt) {
      window.utils.isEscEvent(evt, function () {
        errorMessageNode.remove();
        document.removeEventListener('keydown', onMessageEscPress);
      });
    };

    document.addEventListener('keydown', onMessageEscPress);
  };

  var onMessageClick = function (evt) {
    evt.currentTarget.removeEventListener('click', onMessageClick);
    evt.currentTarget.remove();
  };

  var onPostSuccess = function () {
    var successMessageNode = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

    window.map.activate(false);
    main.insertBefore(successMessageNode, main.firstChild);

    successMessageNode.addEventListener('click', onMessageClick);

    var onMessageEscPress = function (evt) {
      window.utils.isEscEvent(evt, function () {
        successMessageNode.remove();
        document.removeEventListener('keydown', onMessageEscPress);
      });
    };

    document.addEventListener('keydown', onMessageEscPress);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onPostSuccess, onError);
  });

  window.form = {
    onError: onError
  };

})();
