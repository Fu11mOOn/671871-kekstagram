'use strict';

(function () {
  var ACTIVE_CLASS = 'img-filters__button--active';

  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');

  var classValidaty = function (evt) {
    var filtersButtons = document.querySelectorAll('.img-filters__button');

    filtersButtons.forEach(function (element) {
      element.classList.remove(ACTIVE_CLASS);
    });
    evt.target.classList.add(ACTIVE_CLASS);
  };

  filterPopular.addEventListener('click', function (evt) {
    window.utilits.eliminateBounce(function () {
      window.gallery.setPopular();
    });
    classValidaty(evt);
  });
  filterNew.addEventListener('click', function (evt) {
    window.utilits.eliminateBounce(function () {
      window.gallery.setNew();
    });
    classValidaty(evt);
  });
  filterDiscussed.addEventListener('click', function (evt) {
    window.utilits.eliminateBounce(function () {
      window.gallery.setDiscussed();
    });
    classValidaty(evt);
  });
})();
