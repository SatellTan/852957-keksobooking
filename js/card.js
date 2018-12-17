'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var typesMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var interpretateRooms = function (roomsNumber) {
    var lastNumber = Math.floor(roomsNumber % 10);

    if (roomsNumber === 0) {
      return '';
    }

    switch (lastNumber) {
      case 1 : return roomsNumber + ' комната для ';
      case 2 : return roomsNumber + ' комнаты для ';
      case 3 : return roomsNumber + ' комнаты для ';
      case 4 : return roomsNumber + ' комнаты для ';
      default: return roomsNumber + ' комнат для ';
    }
  };

  var interpretateGuests = function (guestsNumber) {
    switch (guestsNumber) {
      case 0 : return '';
      case 1 : return guestsNumber + ' гостя';
      default: return guestsNumber + ' гостей';
    }
  };

  var renderCard = function (arrayItem) {

    var cardElement = cardTemplate.cloneNode(true);
    var cardTitle = cardElement.querySelector('.popup__title');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardType = cardElement.querySelector('.popup__type');
    var cardRoomsGuests = cardElement.querySelector('.popup__text--capacity');
    var cardCheckinCheckout = cardElement.querySelector('.popup__text--time');
    var cardDescription = cardElement.querySelector('.popup__description');
    var cardAvatar = cardElement.querySelector('.popup__avatar');


    renderCardInfo(cardTitle, arrayItem.offer.title);
    renderCardInfo(cardAddress, arrayItem.offer.address);
    renderCardInfo(cardPrice, arrayItem.offer.price + '₽/ночь');
    renderCardInfo(cardType, typesMap[arrayItem.offer.type]);
    renderCardInfo(cardRoomsGuests, interpretateRooms(arrayItem.offer.rooms) + interpretateGuests(arrayItem.offer.guests));
    renderCardInfo(cardCheckinCheckout, 'Заезд после ' + arrayItem.offer.checkin + ', выезд до ' + arrayItem.offer.checkout);
    renderCardInfo(cardDescription, arrayItem.offer.description);
    cardAvatar.setAttribute('src', arrayItem.author.avatar);

    function renderCardInfo(block, info) {
      if (info) {
        block.textContent = info;
      } else {
        block.remove();
      }
    }

    var photosBlock = cardElement.querySelector('.popup__photos');
    var photosBlockChild = cardElement.querySelector('.popup__photo');

    function renderCardPhotos(photosList, block) {
      if (photosList.length > 0) {
        for (var i = 0; i < photosList.length; i++) {
          photosBlock.appendChild(photosBlockChild.cloneNode(true)).setAttribute('src', photosList[i]);
        }
        photosBlock.removeChild(photosBlockChild);
      } else {
        block.remove();
      }
    }

    renderCardPhotos(arrayItem.offer.photos, photosBlock);

    var featuresBlock = cardElement.querySelector('.popup__features');
    renderCardFeatures(arrayItem.offer.features, featuresBlock);

    function renderCardFeatures(featuresList, block) {
      if (featuresList.length > 0) {
        var fragment = document.createDocumentFragment();

        while (block.firstChild) {
          block.firstChild.remove();
        }

        featuresList.forEach(function (feature) {
          var featureElement = document.createElement('li');
          featureElement.classList.add('feature', 'feature--' + feature);
          fragment.appendChild(featureElement);
        });

        block.appendChild(fragment);
      } else {
        block.remove();
      }
    }

    return cardElement;
  };

  window.card = {
    render: renderCard
  };

})();
