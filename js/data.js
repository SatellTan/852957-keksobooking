'use strict';

(function () {

  var offers = [];

  // Загрузка данных
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onGetSuccess = function (dataArray) {
    for (var i = 0; i < dataArray.length; i++) {
      offers[i] = dataArray[i];
    }
  };

  window.backend.load(onGetSuccess, onError);


  window.data = {
    offers: offers
  };

})();
