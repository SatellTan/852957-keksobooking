'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeaturws = mapFilters.querySelector('#housing-features');


  function filterType(hotel) {
    return (housingType.value === 'any' || hotel.offer.type === housingType.value);
  };

  function filterHotels(hotels) {
    console.log(hotels);
    return hotels.filter(filterType);
  };

  window.filter = filterHotels;

})();
