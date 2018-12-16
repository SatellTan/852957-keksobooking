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

  var changeTimeOut = function () {
    timeInField.options[timeInField.selectedIndex].selected = false;
    timeInField.options[timeOutField.selectedIndex].selected = true;
  };

  var changeTimeIn = function () {
    timeOutField.options[timeOutField.selectedIndex].selected = false;
    timeOutField.options[timeInField.selectedIndex].selected = true;
  };

  var typesMap = {
    0: MIN_BUNGALO_PRICE,
    1: MIN_FLAT_PRICE,
    2: MIN_HOUSE_PRICE,
    3: MIN_PALACE_PRICE
  };

  var changeTypeOfHousing = function () {
    priceInputField.setAttribute('min', typesMap[typeOfHousingField.selectedIndex]);
    priceInputField.setAttribute('placeholder', typesMap[typeOfHousingField.selectedIndex]);
  };

  var changeRoomNumber = function () {
    for (var i = 0; i < capacityField.length; i++) {
      capacityField[i].disabled = true;
    }
    switch (roomNumberField.selectedIndex) {
      case 0 : capacityField[2].disabled = false;
        break;
      case 1 : capacityField[1].disabled = false;
        capacityField[2].disabled = false;
        break;
      case 2 : capacityField[0].disabled = false;
        capacityField[1].disabled = false;
        capacityField[2].disabled = false;
        break;
      case 3 : capacityField[3].disabled = false;
        break;
    }

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


  // Загрузка данных
  var onError = function () {
    var errorMessageElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var errorButton = errorMessageElement.querySelector('.error__button');

    main.insertBefore(errorMessageElement, main.firstChild);

    errorMessageElement.addEventListener('click', onMessageClick);

    var onErrorButtonClick = function (evt) {
      evt.currentTarget.removeEventListener('click', onErrorButtonClick);
      evt.currentTarget.remove();
    };

    errorButton.addEventListener('click', onErrorButtonClick);

    var onMessageEscPress = function (evt) {
      window.utils.isEscEvent(evt, function () {
        errorMessageElement.remove();
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
    var successMessageElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

    window.map.activate(false);
    main.insertBefore(successMessageElement, main.firstChild);

    successMessageElement.addEventListener('click', onMessageClick);

    var onMessageEscPress = function (evt) {
      window.utils.isEscEvent(evt, function () {
        successMessageElement.remove();
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
