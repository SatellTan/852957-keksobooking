'use strict';

(function () {

  var offers = [];

  var onGetSuccess = function (dataArray) {
    dataArray.forEach(function (item, index) {
      offers[index] = item;
    });
  };

  window.backend.load(onGetSuccess, window.form.onError);

  window.data = {
    offers: offers
  };

})();
