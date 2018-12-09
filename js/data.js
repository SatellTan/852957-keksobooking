'use strict';

(function () {

  var OFFERS_NUMBER = 8;

  var offers = [];
  var titlesOfOffer = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var typesOfOffer = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var services = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosOfOffer = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var locationX;
  var locationY;
  var mapBlockWidth = document.querySelector('.map').clientWidth;

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
    locationX = getRandomInRange(0, mapBlockWidth);
    locationY = getRandomInRange(130, 630);
    offers[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
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

  window.data = {
    offers: offers
  };

})();
