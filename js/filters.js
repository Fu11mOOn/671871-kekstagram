'use strict';

(function () {
  var ACTIVE_CLASS = 'img-filters__button--active';

  var filters = document.querySelector('.img-filters');

  var classValidaty = function (evt) {
    var filtersButtons = document.querySelectorAll('.img-filters__button');

    filtersButtons.forEach(function (element) {
      element.classList.remove(ACTIVE_CLASS);
    });
    evt.target.classList.add(ACTIVE_CLASS);
  };

  filters.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('img-filters__button')) {
      window.utilits.eliminateBounce(function () {
        window.gallery.filter(evt.target.id);
      });
      classValidaty(evt.target);
    }
  });
})();
