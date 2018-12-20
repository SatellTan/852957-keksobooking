'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var file;
  var offerPhotosContainer = document.querySelector('.ad-form__photo-container');
  var fileChooserOfferPhoto = document.querySelector('.ad-form__upload input[type=file]');

  var insertImg = function (preview) {

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.setAttribute('src', reader.result);
      });

      reader.readAsDataURL(file);
      file = '';
    }
  };

  fileChooserAvatar.addEventListener('change', function () {
    file = fileChooserAvatar.files[0];
    insertImg(previewAvatar);
  });

  fileChooserOfferPhoto.addEventListener('change', function () {

    for (var i = 0; i < fileChooserOfferPhoto.files.length; i++) {
      file = fileChooserOfferPhoto.files[i];

      var offerPhotos = document.querySelectorAll('.ad-form__photo');
      var photoItem;

      if (offerPhotos[offerPhotos.length - 1].children.length !== 0) {
        photoItem = document.createElement('div');
        photoItem.classList.add('ad-form__photo');
      } else {
        photoItem = offerPhotos[offerPhotos.length - 1];
      }

      var photoImg = document.createElement('img');
      photoImg.setAttribute('width', '70');
      photoImg.setAttribute('height', '70');
      insertImg(photoImg);

      photoItem.appendChild(photoImg);
      offerPhotosContainer.appendChild(photoItem);
    }
  });

})();
