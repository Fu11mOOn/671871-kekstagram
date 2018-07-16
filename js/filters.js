'use strict';

(function () {
  var ACTIVE_CLASS = 'img-filters__button--active';

  var filters = document.querySelector('.img-filters');

  var classValidaty = function (element) {
    var filtersButtons = filters.querySelectorAll('.img-filters__button');

    for (var i = 0; i < filtersButtons.length; i++) {
      if (filtersButtons[i].classList.contains(ACTIVE_CLASS)) {
        filtersButtons[i].classList.remove(ACTIVE_CLASS);
        break;
      }
    }

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
