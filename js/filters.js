'use strict';

(function () {
  var ACTIVE_CLASS = 'img-filters__button--active';

  var filters = document.querySelector('.img-filters');

  var classValidaty = function (element) {
    var filtersButtons = document.querySelectorAll('.img-filters__button');

    filtersButtons.forEach(function (it) {
      it.classList.remove(ACTIVE_CLASS);
    });
    element.classList.add(ACTIVE_CLASS);
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
