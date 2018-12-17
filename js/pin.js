'use strict';

(function () {

  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGTH = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (arrayItem, index) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinLeft = (arrayItem.location.x - MAP_PIN_WIDTH / 2) + 'px';
    var pinTop = (arrayItem.location.y - MAP_PIN_HEIGTH) + 'px';

    pinElement.setAttribute('style', 'left: ' + pinLeft + '; top: ' + pinTop);
    pinElement.querySelector('img').setAttribute('alt', arrayItem.offer.title);
    pinElement.querySelector('img').setAttribute('src', arrayItem.author.avatar);
    pinElement.setAttribute('data-id', index);

    return pinElement;
  };

  window.pin = {
    render: renderPin
  };

})();
