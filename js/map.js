'use strict';

var OFFERS_NUMBER = 8;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGTH = 70;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var offers = [];
var titlesOfOffer = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typesOfOffer = ['palace', 'flat', 'house', 'bungalo'];
var avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
var times = ['12:00', '13:00', '14:00'];
var services = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosOfOffer = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var locationX;
var locationY;
var mapBlock = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var form = document.querySelector('.ad-form');
var formElements = form.querySelectorAll('.ad-form__element');
var addressField = form.querySelector('#address');
var mapPinMain = document.querySelector('.map__pin--main');

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var itemSelection = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var itemSelectionWithDeleting = function (array) {
  var index = Math.floor(Math.random() * array.length);
  var itemSelect = array[index];
  array.splice(index, 1);

  return itemSelect;
};

var partOfArray = function (array) {
  var resultArray = [];
  var members = Math.floor(Math.random() * (array.length + 1));

  for (var i = 0; i < members; i++) {
    resultArray[i] = array[i];
  }

  return resultArray;
};

var arrayShaker = function (array) {
  var resultArray = [];
  var arrayAccessory = array.slice();

  while (arrayAccessory.length) {
    resultArray.push(itemSelectionWithDeleting(arrayAccessory));
  }

  return resultArray;
};

var titlesOfOfferAccessory = titlesOfOffer.slice();


for (var i = 0; i < OFFERS_NUMBER; i++) {
  locationX = getRandomInRange(0, mapBlock.clientWidth);
  locationY = getRandomInRange(130, 630);
  offers[i] = {
    author: {
      avatar: 'img/avatars/user0' + itemSelectionWithDeleting(avatarNumbers) + '.png'
    },
    location: {
      x: locationX,
      y: locationY
    },
    offer: {
      title: itemSelectionWithDeleting(titlesOfOfferAccessory),
      address: locationX + ', ' + locationY,
      price: getRandomInRange(1000, 1000000),
      type: itemSelection(typesOfOffer),
      rooms: getRandomInRange(1, 5),
      guests: getRandomInRange(1, 10),
      checkin: itemSelection(times),
      checkout: itemSelection(times),
      features: partOfArray(services),
      description: '',
      photos: arrayShaker(photosOfOffer)
    }
  };
}

var renderPin = function (arrayItem) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinLeft = (arrayItem.location.x - MAP_PIN_WIDTH / 2) + 'px';
  var pinTop = (arrayItem.location.y - MAP_PIN_HEIGTH) + 'px';

  pinElement.setAttribute('style', 'left: ' + pinLeft + '; top: ' + pinTop);
  pinElement.querySelector('img').setAttribute('alt', arrayItem.offer.title);
  pinElement.querySelector('img').setAttribute('src', arrayItem.author.avatar);

  return pinElement;
};

var fillingBlock = function (array) {
  var fragment = document.createDocumentFragment();

  for (i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }

  return fragment;
};

var interpretationOfferType = function (type) {
  switch (type) {
    case 'flat': return 'Квартира';
    case 'bungalo': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
    default: return '';
  }
};

var interpretationRooms = function (roomsNumber) {
  switch (roomsNumber) {
    case 1 : return roomsNumber + ' комната для ';
    case 5 : return roomsNumber + ' комнат для ';
    default: return roomsNumber + ' комнаты для ';
  }
};

var interpretationGuests = function (guestsNumber) {
  switch (guestsNumber) {
    case 1 : return guestsNumber + ' гостя';
    default: return guestsNumber + ' гостей';
  }
};

var renderCard = function (arrayItem) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = arrayItem.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = arrayItem.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = arrayItem.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = interpretationOfferType(arrayItem.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = interpretationRooms(arrayItem.offer.rooms) + interpretationGuests(arrayItem.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayItem.offer.checkin + ', выезд до ' + arrayItem.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = arrayItem.offer.description;
  cardElement.querySelector('.popup__avatar').setAttribute('src', arrayItem.author.avatar);

  var photosBlock = cardElement.querySelector('.popup__photos');
  var photosBlockChild = cardElement.querySelector('.popup__photo');

  for (i = 0; i < arrayItem.offer.photos.length; i++) {
    photosBlock.appendChild(photosBlockChild.cloneNode(true)).setAttribute('src', arrayItem.offer.photos[i]);
  }
  photosBlock.removeChild(photosBlockChild); // удаление первого шаблонного элемента с пустым фото

  var featuresBlock = cardElement.querySelector('.popup__features');
  var children = featuresBlock.children;

  for (i = children.length - 1; i >= arrayItem.offer.features.length; i--) {
    var child = children[i];
    child.parentElement.removeChild(child);
  }

  return cardElement;
};

var fillingCard = function (arrayItem) {
  var fragment = document.createDocumentFragment();

  fragment.appendChild(renderCard(arrayItem));

  return fragment;
};

for (i = 0; i < formElements.length; i++) {
  formElements[i].disabled = true;
}

var addressUpdate = function (x, y) {
  addressField.value = x + ', ' + y;
};

// установка изначального адреса главной метки
var mapPinMainRect = mapPinMain.getBoundingClientRect();
addressUpdate(Math.round(mapPinMainRect.left + mapPinMain.offsetWidth / 2), Math.round(mapPinMainRect.top + mapPinMain.offsetHeight / 2));

mapPinMain.addEventListener('mouseup', function () {
  // перевод карты в актвное состояние
  mapBlock.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  for (i = 0; i < formElements.length; i++) {
    formElements[i].disabled = false;
  }
  mapPins.appendChild(fillingBlock(offers));

  mapPinMainRect = mapPinMain.getBoundingClientRect();
  addressUpdate(Math.round(mapPinMainRect.left + mapPinMain.offsetWidth / 2), Math.round(mapPinMainRect.bottom));

  // добавить обработчик события клика на каждую метку
  var mapPin = document.querySelectorAll('.map__pin');
  for (i = 0; i < mapPin.length; i++) {
    mapPin[i].addEventListener('click', onMapPinClick, false);
  }
});

var onMapPinClick = function () {
  // Найти в массиве элемент, соответствующий вызвавшей обработчик метке
  for (var j = 0; j < offers.length; j++) {
    var pinLeft = (offers[j].location.x - MAP_PIN_WIDTH / 2) + 'px';
    var pinTop = (offers[j].location.y - MAP_PIN_HEIGTH) + 'px';

    if (this.style.left === pinLeft && this.style.top === pinTop) {
      closePopup(); // закрыть уже имеющуюся карточку, если она отображена

      this.classList.add('.map__pin--active');
      mapBlock.insertBefore(fillingCard(offers[j]), mapFiltersContainer);
      mapBlock.addEventListener('keydown', onPopupEscPress);

      var popupClose = mapBlock.querySelector('.popup__close'); // добавить обработчик событий на закрывающую попап кнопку

      popupClose.addEventListener('click', function () {
        closePopup();
      });

      popupClose.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          closePopup();
        }
      });
    }
  }
};

var closePopup = function () {
  var PopupElement = document.querySelector('.map__card');
  if (PopupElement) {
    PopupElement.parentNode.removeChild(PopupElement);
  }
  mapBlock.removeEventListener('keydown', onPopupEscPress);

  var mapPinActive = document.querySelector('.map__pin--active');
  if (mapPinActive) {
    mapPinActive.classList.remove('.map__pin--active');
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};
