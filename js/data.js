'use strict';

(function () {

  var offers = [];

  var onGetSuccess = function (dataArray) {
    for (var i = 0; i < dataArray.length; i++) {
      offers[i] = dataArray[i];
    }
  };

  window.backend.load(onGetSuccess, window.form.onError);

  window.data = {
    offers: offers
  };

})();
