'use strict';

(function () {

  var START_LEFT_MAIN_PIN = '570px';
  var START_TOP_MAIN_PIN = '375px';

  var mapBlock = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var filter = document.querySelector('.map__filters');
  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var addressField = form.querySelector('#address');
  var formReset = form.querySelector('.ad-form__reset');

  var fillingBlock = function (array) { // заполнение блока метками
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      if ('offer' in array[i]) {
        fragment.appendChild(window.pin.render(array[i], i));
      }
    }

    return fragment;
  };

  var fillingCard = function (arrayItem) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(window.card.render(arrayItem));

    return fragment;
  };

  var setAvailabilityOfElements = function (block, availability) {
    var nodeChildren = block.children;

    for (var i = 0; i < nodeChildren.length; i++) {
      nodeChildren[i].disabled = !availability;
    }
  };

  var addressUpdate = function (x, y) {
    addressField.value = x + ', ' + y;
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

  var cleanNode = function (parent, selector) { // Удалить из узла потомков согласно селектору
    var nodeChildren = [];
    if (selector) {
      nodeChildren = parent.querySelectorAll(selector);
    } else {
      nodeChildren = parent.children;
    }

    for (var i = nodeChildren.length - 1; i >= 0; i--) {
      if (nodeChildren[i].classList.contains('map__pin')) {
        nodeChildren[i].removeEventListener('click', onMapPinClick);
      }
      parent.removeChild(nodeChildren[i]);
    }
  };

  var activateMap = function (status) {
    if (!status) {
      // сделать карту неактивной
      cleanNode(mapPins, '.map__pin:not(.map__pin--main)');
      closePopup();
      form.reset();
      mapPinMain .style.left = START_LEFT_MAIN_PIN;
      mapPinMain.style.top = START_TOP_MAIN_PIN;
      addressUpdate(Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2), Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2));

      mapBlock.classList.add('map--faded');
      form.classList.add('ad-form--disabled');
    } else {
      mapBlock.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      addressUpdate(Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2), Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight));
      mapPins.appendChild(fillingBlock(window.data.offers));

      // добавить обработчик события клика на каждую метку, кроме главной
      var mapPin = document.querySelectorAll('.map__pin');
      for (var i = 0; i < mapPin.length; i++) {
        if (!mapPin[i].classList.contains('map__pin--main')) {
          mapPin[i].addEventListener('click', onMapPinClick);
        }
      }
    }

    setAvailabilityOfElements(form, status);
    setAvailabilityOfElements(filter, status);
    addressField.readOnly = true;
  };

  activateMap(false);

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
      if (mapBlock.classList.contains('map--faded')) {
        // активация карты и первоначальные настройки
        activateMap(true);
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

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    activateMap(false);
  });

  // Нажатие enter на главной метке
  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      activateMap(true);
    });
  });

  window.map = {
    activate: activateMap
  };

})();
