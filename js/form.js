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
    var pictureEditor = document.querySelector('.img-upload__overlay');
    var pictureEditorCloseButton = document.querySelector('.img-upload__cancel');
    var picturePreviewContainer = document.querySelector('.img-upload__preview');
    var picturePreview = picturePreviewContainer.querySelector('img');
    var effectsPreviews = document.querySelectorAll('.effects__preview');
    var pictureEffects = document.querySelectorAll('.effects__radio');
    var labelsOfEffects = document.querySelectorAll('.effects__label');
    var currentEffect = document.querySelector('input[type="radio"]:checked').value;
    var sizeUpButton = document.querySelector('.resize__control--plus');
    var sizeDownButton = document.querySelector('.resize__control--minus');
    var sizeInput = document.querySelector('.resize__control--value');
    var hashtagsInput = document.querySelector('.text__hashtags');
    var commentInput = document.querySelector('.text__description');
    var uploadSubmitButton = document.querySelector('.img-upload__submit');
    var currentSize = MAX_SIZE_OF_PICTURE_PREVIEW;
    var sliderContainer = document.querySelector('.img-upload__scale');
    var sliderOfEffectIntensity = document.querySelector('.scale__pin');
    var sliderValue = document.querySelector('.scale__value');
    var sliderLine = document.querySelector('.scale__line');
    var sliderBar = document.querySelector('.scale__level');
    var lineWidth = '';
    var errorContainer = document.querySelector('#picture').content.querySelector('.img-upload__message--error').cloneNode(true);
    var repeatButton = errorContainer.querySelector('.error__link:first-child');
    var otherFileButton = errorContainer.querySelector('.error__link:nth-child(2)');
    var lastFocusedElement;

    var scalePicturePreview = function (value) {
      var editProperty = function (valueOfProperty) {
        currentSize = valueOfProperty;
        sizeInput.value = currentSize + '%';

        if (currentSize === MAX_SIZE_OF_PICTURE_PREVIEW) {
          picturePreviewContainer.style.transform = '';
        } else {
          picturePreviewContainer.style.transform = 'scale(0.' + currentSize + ')';
        }
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
    var onSliderMouseDown = function (evt) {
      var startCoordinateX = evt.clientX;

      var onMouseMove = function (moveEvt) {
        var shiftX = startCoordinateX - moveEvt.clientX;
        var coordinate = sliderOfEffectIntensity.offsetLeft - shiftX;

        moveEvt.preventDefault();
        startCoordinateX = moveEvt.clientX;

        if (coordinate >= 0 && coordinate <= lineWidth) {
          var percent = coordinate / lineWidth;

          sliderOfEffectIntensity.style.left = coordinate + 'px';
          sliderBar.style.width = Math.floor(percent * 100) + '%';
          sliderValue.value = Math.floor(percent * 100);

          setEffect(currentEffect, percent);
        }
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
        if (coordinate < 0) {
          coordinate = 0;
          percent = 0;
        } else if (coordinate > lineWidth) {
          coordinate = lineWidth;
          percent = 1;
        } else {
          percent = coordinate / lineWidth;
        }

        sliderOfEffectIntensity.style.left = coordinate + 'px';
        sliderBar.style.width = Math.floor(percent * 100) + '%';
        sliderValue.value = Math.floor(percent * 100);
        setEffect(currentEffect, percent);
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
      var uploadLabel = document.querySelector('.img-upload__label');

      uploadLabel.click();
      onPictureEditorClose();
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
      var hashtags = hashtagsInput.value.trim();
      var arrayHashtags = hashtags.split(' ');

      var hashtagsInputValidation = function () {
        if (hashtagsInput.validity.valid) {
          hashtagsInput.classList.remove('text__hashtags--error');
          window.backend.save(new FormData(form), onLoad, onError);
          evt.preventDefault();
        } else {
          hashtagsInput.classList.add('text__hashtags--error');
        }
      };

      if (hashtags) {
        for (var i = 0; i < arrayHashtags.length; i++) {
          arrayHashtags[i] = arrayHashtags[i].toLowerCase();

          if (arrayHashtags[i][0] !== '#') {
            hashtagsInput.setCustomValidity('Хештег должен начинаться с символа "#"');
          } else if (arrayHashtags[i].length === 1) {
            hashtagsInput.setCustomValidity('Хештег не может содержать только символ "#"');
          } else if (window.utilits.getNumberOfSimilarElementsAtArray(arrayHashtags[i], '#') > 1) {
            hashtagsInput.setCustomValidity('Хештеги нужно отделять друг от друга пробелами');
          } else if (window.utilits.getNumberOfSimilarElementsAtArray(arrayHashtags, arrayHashtags[i]) > 1) {
            hashtagsInput.setCustomValidity('Нельзя, чтобы хештеги повторялись');
          } else if (arrayHashtags[i].length > HASHTAGS_MAX_LENGTH) {
            hashtagsInput.setCustomValidity('Количество символов в хештеге (включая "#") должно быть не больше ' + HASHTAGS_MAX_LENGTH);
          } else {
            hashtagsInput.setCustomValidity('');
          }
        }

        if (arrayHashtags.length > HASHTAGS_MAX_NUMBER) {
          hashtagsInput.setCustomValidity('Количество хештегов должно быть не больше ' + HASHTAGS_MAX_NUMBER);
        }

      } else {
        hashtagsInput.setCustomValidity('');
      }

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
      });
      labelsOfEffects.forEach(function (element) {
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
    });
    labelsOfEffects.forEach(function (element) {
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
    pictureEditor.scrollTo(0, 0);
    hideSlider();
  };

  pictureUpload.addEventListener('change', onPictureUploadChange);
}());
