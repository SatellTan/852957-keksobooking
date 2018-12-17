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

  function filterType(hotel) {
    return (housingType.value === 'any' || hotel.offer.type === housingType.value);
  }

  function filterPrice(hotel) {
    return (housingPrice.value === 'any' || getPriceCategory(hotel.offer.price) === housingPrice.value);
  }

  function filterRooms(hotel) {
    return (housingRooms.value === 'any' || hotel.offer.rooms === parseInt(housingRooms.value, 10));
  }

  function filterGuests(hotel) {
    return (housingGuests.value === 'any' || hotel.offer.guests === parseInt(housingGuests.value, 10));
  }

  function filterFeatures(hotel) {

    var checkedFeatures = [].map.call(housingFeatures.querySelectorAll('input[name=features]:checked'), function (checkbox) {
      return checkbox.value;
    });

    return checkedFeatures.every(function (feature) {
      return hotel.offer.features.indexOf(feature) > -1;
    });
  }


  function filterHotels(hotels) {
    return hotels.filter(filterType).filter(filterPrice).filter(filterRooms).filter(filterGuests).filter(filterFeatures);
  }

  window.filter = filterHotels;

})();
