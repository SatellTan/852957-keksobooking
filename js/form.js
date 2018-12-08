'use strict';

(function () {

  var MIN_FLAT_PRICE = 1000;
  var MIN_BUNGALO_PRICE = 0;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;

  var form = document.querySelector('.ad-form');
  var addressField = form.querySelector('#address');
  var timeInField = form.querySelector('#timein');
  var timeOutField = form.querySelector('#timeout');
  var typeOfHousingField = form.querySelector('#type');
  var priceInputField = form.querySelector('#price');
  var roomNumberField = form.querySelector('#room_number');
  var capacityField = form.querySelector('#capacity');

  var changeTimeOut = function () {
    timeInField.options[timeInField.selectedIndex].selected = false;
    timeInField.options[timeOutField.selectedIndex].selected = true;
  };

  var changeTimeIn = function () {
    timeOutField.options[timeOutField.selectedIndex].selected = false;
    timeOutField.options[timeInField.selectedIndex].selected = true;
  };

  var changeTypeOfHousing = function () {
    switch (typeOfHousingField.selectedIndex) {
      case 0 : priceInputField.setAttribute('min', MIN_BUNGALO_PRICE);
        priceInputField.setAttribute('placeholder', MIN_BUNGALO_PRICE);
        break;
      case 1 : priceInputField.setAttribute('min', MIN_FLAT_PRICE);
        priceInputField.setAttribute('placeholder', MIN_FLAT_PRICE);
        break;
      case 2 : priceInputField.setAttribute('min', MIN_HOUSE_PRICE);
        priceInputField.setAttribute('placeholder', MIN_HOUSE_PRICE);
        break;
      case 3 : priceInputField.setAttribute('min', MIN_PALACE_PRICE);
        priceInputField.setAttribute('placeholder', MIN_PALACE_PRICE);
        break;
    }
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

  window.form = {
    addressField: addressField,
    form: form
  };

})();
