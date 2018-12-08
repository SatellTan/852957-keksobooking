'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var formElements = document.querySelectorAll('.ad-form__element');
  var filterElements = document.querySelectorAll('.map__filter');
  var mapPinMain = document.querySelector('.map__pin--main');

  var fillingBlock = function (array) { // заполнение блока метками
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.pin.renderPin(array[i], i));
    }

    return fragment;
  };

  var fillingCard = function (arrayItem) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(window.card.renderCard(arrayItem));

    return fragment;
  };

  var setUnavailabilityOfElements = function (block, availability) {
    for (var i = 0; i < block.length; i++) {
      block[i].disabled = availability;
    }
  };

  var addressUpdate = function (x, y) {
    window.form.addressField.value = x + ', ' + y;
  };

  // установка изначального адреса главной метки
  addressUpdate(Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2), Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2));
  setUnavailabilityOfElements(formElements, true);
  setUnavailabilityOfElements(filterElements, true);

  // drag&drop главной метки
  mapPinMain.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var maxPositionX = mapBlock.clientWidth - mapPinMain.offsetWidth;
    var minPositionX = 0;
    var maxPositionY = 630 - mapPinMain.offsetHeight;
    var minPositionY = 130 - mapPinMain.offsetHeight;

    var onMapPinMainMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var delta = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newTop = mapPinMain.offsetTop - delta.y;
      var newLeft = mapPinMain.offsetLeft - delta.x;

      if (newLeft <= minPositionX) {
        newLeft = minPositionX;
      } else if (newLeft >= maxPositionX) {
        newLeft = maxPositionX;
      }

      if (newTop <= minPositionY) {
        newTop = minPositionY;
      } else if (newTop >= maxPositionY) {
        newTop = maxPositionY;
      }

      mapPinMain.style.top = newTop + 'px';
      mapPinMain.style.left = newLeft + 'px';
      addressUpdate(Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2), Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight));
    };

    var onMapPinMainMouseUp = function () {
      if (mapBlock.classList.contains('map--faded')) { // активация карты и первоначальные настройки

        mapBlock.classList.remove('map--faded');
        window.form.form.classList.remove('ad-form--disabled');
        setUnavailabilityOfElements(formElements, false);
        setUnavailabilityOfElements(filterElements, false);
        window.form.addressField.readOnly = true;
        mapPins.appendChild(fillingBlock(window.data.offers));

        // добавить обработчик события клика на каждую метку, кроме главной
        var mapPin = document.querySelectorAll('.map__pin');
        for (var i = 0; i < mapPin.length; i++) {
          if (!mapPin[i].classList.contains('map__pin--main')) {
            mapPin[i].addEventListener('click', onMapPinClick);
          }
        }
      }

      addressUpdate(Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2), Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight));
      document.removeEventListener('mousemove', onMapPinMainMouseMove);
      document.removeEventListener('mouseup', onMapPinMainMouseUp);
    };

    document.addEventListener('mousemove', onMapPinMainMouseMove);
    document.addEventListener('mouseup', onMapPinMainMouseUp);
  });

  // Работа с карточкой метки
  var onMapPinClick = function (evt) {
    closePopup(); // закрыть уже имеющуюся карточку, если она отображена

    evt.currentTarget.classList.add('.map__pin--active');
    mapBlock.insertBefore(fillingCard(window.data.offers[evt.currentTarget.getAttribute('data-id')]), mapFiltersContainer);
    mapBlock.addEventListener('keydown', onPopupEscPress);

    var popupClose = mapBlock.querySelector('.popup__close'); // добавить обработчик событий на закрывающую попап кнопку

    var onPopupCloseClick = function () {
      closePopup();
      popupClose.removeEventListener('click', onPopupCloseClick);
    };

    popupClose.addEventListener('click', onPopupCloseClick);
  };

  var closePopup = function () {
    var popupElement = document.querySelector('.map__card');
    if (popupElement) {
      popupElement.parentNode.removeChild(popupElement);
    }
    mapBlock.removeEventListener('keydown', onPopupEscPress);

    var mapPinActive = document.querySelector('.map__pin--active');
    if (mapPinActive) {
      mapPinActive.classList.remove('.map__pin--active');
    }
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

})();
