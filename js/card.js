'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var TypesMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
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
    cardElement.querySelector('.popup__type').textContent = TypesMap[arrayItem.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = interpretationRooms(arrayItem.offer.rooms) + interpretationGuests(arrayItem.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayItem.offer.checkin + ', выезд до ' + arrayItem.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = arrayItem.offer.description;
    cardElement.querySelector('.popup__avatar').setAttribute('src', arrayItem.author.avatar);

    var photosBlock = cardElement.querySelector('.popup__photos');
    var photosBlockChild = cardElement.querySelector('.popup__photo');

    for (var i = 0; i < arrayItem.offer.photos.length; i++) {
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

  window.card = {
    renderCard: renderCard
  };

})();
