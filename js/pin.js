'use strict';

(function () {

  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGTH = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (arrayItem, index) {
    var pinNode = pinTemplate.cloneNode(true);
    var pinLeft = (arrayItem.location.x - MAP_PIN_WIDTH / 2) + 'px';
    var pinTop = (arrayItem.location.y - MAP_PIN_HEIGTH) + 'px';

    pinNode.setAttribute('style', 'left: ' + pinLeft + '; top: ' + pinTop);
    pinNode.querySelector('img').setAttribute('alt', arrayItem.offer.title);
    pinNode.querySelector('img').setAttribute('src', arrayItem.author.avatar);
    pinNode.setAttribute('data-id', index);

    return pinNode;
  };

  window.pin = {
    render: renderPin
  };

})();
