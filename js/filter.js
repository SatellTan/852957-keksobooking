'use strict';

(function () {

  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');


  function getPriceCategory(price) {
    if (price < PRICE_LOW) {
      return 'low';
    } else if (price >= PRICE_HIGH) {
      return 'high';
    } else {
      return 'middle';
    }
  }

  function filterOffers(hotel) {

    if (!(housingType.value === 'any') && !(hotel.offer.type === housingType.value)) {
      return false;
    }

    if (!(housingPrice.value === 'any') && !(getPriceCategory(hotel.offer.price) === housingPrice.value)) {
      return false;
    }

    if (!(housingRooms.value === 'any') && !(hotel.offer.rooms === parseInt(housingRooms.value, 10))) {
      return false;
    }

    if (!(housingGuests.value === 'any') && !(hotel.offer.guests === parseInt(housingGuests.value, 10))) {
      return false;
    }

    var checkedFeatures = [].map.call(housingFeatures.querySelectorAll('input[name=features]:checked'), function (checkbox) {
      return checkbox.value;
    });

    return checkedFeatures.every(function (feature) {
      return hotel.offer.features.indexOf(feature) > -1;
    });
  }

  function filterHotels(hotels) {
    return hotels.filter(filterOffers);
  }

  window.filter = filterHotels;

})();
