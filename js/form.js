'use strict';

(function () {
  var STEP_OF_CHANGE_SIZE_OF_PICTURE_PREVIEW = 25;
  var MIN_SIZE_OF_PICTURE_PREVIEW = 25;
  var MAX_SIZE_OF_PICTURE_PREVIEW = 100;
  var HASHTAGS_MAX_LENGTH = 20;
  var HASHTAGS_MAX_NUMBER = 5;
  var DEFAULT_EFFECT_VALUE = 100;
  var STEP_AT_PERCENT = 5;

  var pictureUpload = document.querySelector('#upload-file');

  var onPictureUploadChange = function () {
    var form = document.querySelector('.img-upload__form');
    var pictureEditor = form.querySelector('.img-upload__overlay');
    var sizeDownButton = pictureEditor.querySelector('.resize__control--minus');
    var sizeInput = pictureEditor.querySelector('.resize__control--value');
    var sizeUpButton = pictureEditor.querySelector('.resize__control--plus');
    var picturePreviewContainer = pictureEditor.querySelector('.img-upload__preview');
    var picturePreview = picturePreviewContainer.querySelector('img');
    var sliderContainer = pictureEditor.querySelector('.img-upload__scale');
    var sliderValue = sliderContainer.querySelector('.scale__value');
    var sliderLine = sliderContainer.querySelector('.scale__line');
    var sliderBar = sliderLine.querySelector('.scale__level');
    var sliderOfEffectIntensity = sliderLine.querySelector('.scale__pin');
    var pictureEditorCloseButton = pictureEditor.querySelector('.img-upload__cancel');
    var pictureEffects = pictureEditor.querySelectorAll('.effects__radio');
    var effectsPreviews = pictureEditor.querySelectorAll('.effects__preview');
    var currentEffect = pictureEditor.querySelector('input[type="radio"]:checked').value;
    var hashtagsInput = pictureEditor.querySelector('.text__hashtags');
    var commentInput = pictureEditor.querySelector('.text__description');
    var uploadSubmitButton = pictureEditor.querySelector('.img-upload__submit');
    var currentSize = MAX_SIZE_OF_PICTURE_PREVIEW;
    var errorContainer = document.querySelector('#picture').content.querySelector('.img-upload__message--error').cloneNode(true);
    var repeatButton = errorContainer.querySelector('.error__link:first-child');
    var otherFileButton = errorContainer.querySelector('.error__link:nth-child(2)');
    var lastFocusedElement;
    var lineWidth;

    var scalePicturePreview = function (value) {
      var editProperty = function (valueOfProperty) {
        currentSize = valueOfProperty;
        sizeInput.value = currentSize + '%';

        picturePreviewContainer.style.transform = currentSize === MAX_SIZE_OF_PICTURE_PREVIEW ? '' : 'scale(0.' + currentSize + ')';
      };

      if (value >= MAX_SIZE_OF_PICTURE_PREVIEW) {
        editProperty(MAX_SIZE_OF_PICTURE_PREVIEW);
      } else if (value < MIN_SIZE_OF_PICTURE_PREVIEW) {
        editProperty(MIN_SIZE_OF_PICTURE_PREVIEW);
      } else {
        editProperty(value);
      }
    };
    var onSizeUpButtonPressed = function () {
      if (currentSize < MAX_SIZE_OF_PICTURE_PREVIEW) {
        scalePicturePreview(currentSize + STEP_OF_CHANGE_SIZE_OF_PICTURE_PREVIEW);
      }
    };
    var onSizeDownButtonPressed = function () {
      if (currentSize > MIN_SIZE_OF_PICTURE_PREVIEW) {
        scalePicturePreview(currentSize - STEP_OF_CHANGE_SIZE_OF_PICTURE_PREVIEW);
      }
    };
    var hideSlider = function () {
      if (currentEffect === 'none') {
        sliderContainer.classList.add('hidden');
        sliderValue.value = '';
      } else {
        sliderContainer.classList.remove('hidden');
      }
    };
    var setDelaultForEffect = function () {
      sliderBar.style.width = DEFAULT_EFFECT_VALUE + '%';
      sliderOfEffectIntensity.style.left = lineWidth + 'px';
      sliderValue.value = DEFAULT_EFFECT_VALUE;
      picturePreview.style.filter = '';
    };
    var onEffectChange = function (evt) {
      var effectValue = evt.target.value;
      var effectClass = 'effects__preview--' + effectValue;

      picturePreview.classList = '';
      picturePreview.classList.add(effectClass);
      currentEffect = effectValue;
      setDelaultForEffect();
      hideSlider();
    };
    var onEffectEnterPress = function (evt) {
      window.utilits.enterPressed(evt, function () {
        evt.preventDefault();
        evt.target.click();
        lastFocusedElement = document.activeElement;
        sliderOfEffectIntensity.focus();
      });
    };
    var setEffect = function (effect, value) {
      switch (effect) {
        case 'chrome':
          picturePreview.style.filter = 'grayscale(' + value + ')';
          break;
        case 'sepia':
          picturePreview.style.filter = 'sepia(' + value + ')';
          break;
        case 'marvin':
          picturePreview.style.filter = 'invert(' + (value * 100) + '%)';
          break;
        case 'phobos':
          picturePreview.style.filter = 'blur(' + (value * 3) + 'px)';
          break;
        case 'heat':
          picturePreview.style.filter = 'brightness(' + ((value * 2) + 1) + ')';
          break;
        default:
          picturePreview.style.filter = '';
          break;
      }
    };
    var setSliderPosition = function (evt, percent, coordinate) {
      if (coordinate < 0) {
        coordinate = 0;
        percent = 0;
      } else if (coordinate > lineWidth) {
        coordinate = lineWidth;
        percent = 1;
      } else {
        percent = coordinate / lineWidth;
      }

      evt.preventDefault();
      sliderOfEffectIntensity.style.left = coordinate + 'px';
      sliderBar.style.width = Math.floor(percent * 100) + '%';
      sliderValue.value = Math.floor(percent * 100);
      setEffect(currentEffect, percent);
    };
    var onSliderMouseDown = function (evt) {
      var startCoordinateX = evt.clientX;

      var onMouseMove = function (moveEvt) {
        var shiftX = startCoordinateX - moveEvt.clientX;
        var coordinate = sliderOfEffectIntensity.offsetLeft - shiftX;
        var percent;

        startCoordinateX = moveEvt.clientX;
        setSliderPosition(evt, percent, coordinate);
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
    var onSliderKeyPress = function (evt) {
      var onKeyPress = function (key) {
        var startCoordinateX = sliderOfEffectIntensity.offsetLeft;
        var shift = (lineWidth * STEP_AT_PERCENT / 100);
        var coordinate;
        var percent;

        switch (key) {
          case 'left':
            coordinate = startCoordinateX - shift;
            break;
          case 'right':
            coordinate = startCoordinateX + shift;
            break;
        }

        setSliderPosition(evt, percent, coordinate);
      };

      if (document.activeElement === sliderOfEffectIntensity) {
        window.utilits.leftPressed(evt, function () {
          onKeyPress('left');
        });
        window.utilits.rightPressed(evt, function () {
          onKeyPress('right');
        });
      }
    };
    var onSliderBlur = function () {
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    };
    var onLoad = function () {
      onPictureEditorClose();
      window.utilits.removeErrorText(pictureEditor);
    };
    var onOtherFileButtonPress = function () {
      var uploadLabel = form.querySelector('.img-upload__label');

      onPictureEditorClose();
      uploadLabel.click();
    };
    var onError = function (errorText) {
      errorContainer.classList.remove('hidden');
      errorContainer.style.zIndex = 1;
      pictureEditor.appendChild(errorContainer);
      repeatButton.addEventListener('click', onFormSubmit);
      otherFileButton.addEventListener('click', onOtherFileButtonPress);
      window.utilits.addErrorText(errorText, errorContainer);
    };
    var onFormSubmit = function (evt) {
      var hashtagsInputValidation = function () {
        if (hashtagsInput.validity.valid) {
          hashtagsInput.classList.remove('text__hashtags--error');
          window.backend.save(new FormData(form), onLoad, onError);
          evt.preventDefault();
        } else {
          hashtagsInput.classList.add('text__hashtags--error');
        }
      };
      var hashtagsValidation = function () {
        var hashtags = hashtagsInput.value.trim().toLowerCase();
        var arrayHashtags;

        if (hashtags) {
          arrayHashtags = hashtags.split(' ');
        } else {
          hashtagsInput.setCustomValidity('');
          return;
        }

        var isEmptyHashtag = arrayHashtags.some(function (item) {
          return item [0] !== '#';
        });

        if (isEmptyHashtag) {
          hashtagsInput.setCustomValidity('Хештег должен начинаться с символа "#"');
          return;
        }

        var isContainsOnlyHash = arrayHashtags.some(function (item) {
          return item === '#';
        });

        if (isContainsOnlyHash) {
          hashtagsInput.setCustomValidity('Хештег не может содержать только символ "#"');
          return;
        }

        var isHashtagsWrittenTogether = arrayHashtags.some(function (item) {
          return window.utilits.getNumberOfSimilarElementsAtArray(item, '#') > 1;
        });

        if (isHashtagsWrittenTogether) {
          hashtagsInput.setCustomValidity('Хештеги нужно отделять друг от друга пробелами');
          return;
        }

        var isHashtagsRepeated = arrayHashtags.some(function (item) {
          return window.utilits.getNumberOfSimilarElementsAtArray(arrayHashtags, item) > 1;
        });

        if (isHashtagsRepeated) {
          hashtagsInput.setCustomValidity('Хештеги не должны повторяться');
          return;
        }

        var isHashtagTooLong = arrayHashtags.some(function (item) {
          return item.length > HASHTAGS_MAX_LENGTH;
        });

        if (isHashtagTooLong) {
          hashtagsInput.setCustomValidity('Количество символов в хештеге (включая "#") должно быть не больше ' + HASHTAGS_MAX_LENGTH);
          return;
        }
        if (arrayHashtags.length > HASHTAGS_MAX_NUMBER) {
          hashtagsInput.setCustomValidity('Количество хештегов должно быть не больше ' + HASHTAGS_MAX_NUMBER);
          return;
        }

        hashtagsInput.setCustomValidity('');
      };

      hashtagsValidation();
      hashtagsInputValidation();
    };
    var onPictureEditorClose = function () {
      if (pictureEditor.lastChild === errorContainer) {
        pictureEditor.lastChild.remove();
      }

      form.reset();
      picturePreviewContainer.style.transform = '';
      picturePreview.style.filter = '';
      picturePreview.classList = '';
      pictureEditor.classList.add('hidden');
      document.removeEventListener('keydown', onPictureEditorEscPressed);
      pictureEditorCloseButton.removeEventListener('click', onPictureEditorClose);
      sizeUpButton.removeEventListener('click', onSizeUpButtonPressed);
      sizeDownButton.removeEventListener('click', onSizeDownButtonPressed);
      pictureEffects.forEach(function (element) {
        element.removeEventListener('change', onEffectChange);
        element.removeEventListener('keydown', onEffectEnterPress);
      });
      hashtagsInput.removeEventListener('focus', onHashtagsInputFocus);
      hashtagsInput.removeEventListener('blur', onHashtagsInputBlur);
      commentInput.removeEventListener('focus', onCommentInputFocus);
      commentInput.removeEventListener('blur', onCommentInputBlur);
      uploadSubmitButton.removeEventListener('click', onFormSubmit);
      sliderOfEffectIntensity.removeEventListener('mousedown', onSliderMouseDown);
      sliderOfEffectIntensity.removeEventListener('blur', onSliderBlur);
      document.removeEventListener('keydown', onSliderKeyPress);
      sliderContainer.classList.remove('hidden');
    };
    var onPictureEditorEscPressed = function (evt) {
      window.utilits.escPressed(evt, onPictureEditorClose);
    };
    var onHashtagsInputFocus = function () {
      document.removeEventListener('keydown', onPictureEditorEscPressed);
    };
    var onHashtagsInputBlur = function () {
      document.addEventListener('keydown', onPictureEditorEscPressed);
    };
    var onCommentInputFocus = function () {
      document.removeEventListener('keydown', onPictureEditorEscPressed);
    };
    var onCommentInputBlur = function () {
      document.addEventListener('keydown', onPictureEditorEscPressed);
    };

    pictureEditor.classList.remove('hidden');
    picturePreview.src = '';
    effectsPreviews.forEach(function (it) {
      it.style.backgroundImage = '';
    });
    pictureEffects.forEach(function (element) {
      element.addEventListener('change', onEffectChange);
      element.addEventListener('keydown', onEffectEnterPress);
    });
    document.addEventListener('keydown', onPictureEditorEscPressed);
    pictureEditorCloseButton.addEventListener('click', onPictureEditorClose);
    sizeInput.value = MAX_SIZE_OF_PICTURE_PREVIEW + '%';
    sizeUpButton.addEventListener('click', onSizeUpButtonPressed);
    sizeDownButton.addEventListener('click', onSizeDownButtonPressed);
    hashtagsInput.addEventListener('focus', onHashtagsInputFocus);
    hashtagsInput.addEventListener('blur', onHashtagsInputBlur);
    commentInput.addEventListener('focus', onCommentInputFocus);
    commentInput.addEventListener('blur', onCommentInputBlur);
    uploadSubmitButton.addEventListener('click', onFormSubmit);
    sliderOfEffectIntensity.addEventListener('mousedown', onSliderMouseDown);
    sliderOfEffectIntensity.addEventListener('blur', onSliderBlur);
    document.addEventListener('keydown', onSliderKeyPress);
    lineWidth = sliderLine.offsetWidth;
    hideSlider();
  };

  pictureUpload.addEventListener('change', onPictureUploadChange);
}());
