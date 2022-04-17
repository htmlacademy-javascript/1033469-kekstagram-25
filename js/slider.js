import '../nouislider/nouislider.js';

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const radioElements = document.querySelectorAll('.effects__radio');
const previewImg = document.querySelector('.img-upload__preview img');
let filterType = '';

const SLIDER_STEP = 0.1;
const SLIDER_MIN = 0;
const SLIDER_MAX = 1;

const SLIDER_STEP_MARVIN = 1;
const SLIDER_MIN_MARVIN = 0;
const SLIDER_MAX_MARVIN = 100;

const SLIDER_STEP_PHOBOS = 0.1;
const SLIDER_MIN_PHOBOS = 0;
const SLIDER_MAX_PHOBOS = 3;

const SLIDER_STEP_HEAT = 0.1;
const SLIDER_MIN_HEAT = 1;
const SLIDER_MAX_HEAT = 3;

const setSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: SLIDER_MIN,
      max: SLIDER_MAX,
    },
    start: SLIDER_MAX,
    step: SLIDER_STEP,
    connect: 'lower'
  });

  const addSliderSettings = () => {
    for (let i = 0; i < radioElements.length; i++) {
      radioElements[i].addEventListener('change', (evt) => {
        previewImg.className = '';
        if (evt.target.value === 'none') {
          sliderElement.classList.add('hidden');
          previewImg.style.filter = 'none';
          filterType = 'none';
        }
        else {
          sliderElement.classList.remove('hidden');
          previewImg.style.filter = '';
          previewImg.classList.add(`effects__preview--${evt.target.value}`);
          if (evt.target.value === 'chrome') {
            sliderElement.noUiSlider.updateOptions({
              range: {
                min: SLIDER_MIN,
                max: SLIDER_MAX,
              },
              start: SLIDER_MAX,
              step: SLIDER_STEP
            });
            filterType = 'grayscale';
            previewImg.style.filter = `${filterType}(1)`;
          }
          if (evt.target.value === 'sepia') {
            sliderElement.noUiSlider.updateOptions({
              range: {
                min: SLIDER_MIN,
                max: SLIDER_MAX,
              },
              start: SLIDER_MAX,
              step: SLIDER_STEP
            });
            filterType = 'sepia';
            previewImg.style.filter = `${filterType}(1)`;
          }
          if (evt.target.value === 'marvin') {
            sliderElement.noUiSlider.updateOptions({
              range: {
                min: SLIDER_MIN_MARVIN,
                max: SLIDER_MAX_MARVIN,
              },
              start: SLIDER_MAX_MARVIN,
              step: SLIDER_STEP_MARVIN
            });
            filterType = 'invert';
            previewImg.style.filter = `${filterType}(100%)`;
          }
          if (evt.target.value === 'phobos') {
            sliderElement.noUiSlider.updateOptions({
              range: {
                min: SLIDER_MIN_PHOBOS,
                max: SLIDER_MAX_PHOBOS,
              },
              start: SLIDER_MAX_PHOBOS,
              step: SLIDER_STEP_PHOBOS
            });
            filterType = 'blur';
            previewImg.style.filter = `${filterType}(3px)`;
          }
          if (evt.target.value === 'heat') {
            sliderElement.noUiSlider.updateOptions({
              range: {
                min: SLIDER_MIN_HEAT,
                max: SLIDER_MAX_HEAT,
              },
              start: SLIDER_MAX_HEAT,
              step: SLIDER_STEP_HEAT
            });
            filterType = 'brightness';
            previewImg.style.filter = `${filterType}(3)`;
          }
        }
      });
    }
  };

  addSliderSettings();

  sliderElement.noUiSlider.on('update', () => {
    const tmp = sliderElement.noUiSlider.get();
    valueElement.value = tmp;
    if (filterType !== 'none') {
      if (filterType === 'blur') {
        previewImg.style.filter = `${filterType}(${tmp}px)`;
      }
      else if(filterType ===  'invert') {
        previewImg.style.filter = `${filterType}(${tmp}%)`;
      }
      else {
        previewImg.style.filter = `${filterType}(${tmp})`;
      }
    }
  });
};

const resetSlider = () => {
  previewImg.className = '';
  sliderElement.classList.add('hidden');
  previewImg.style.filter = 'none';
  filterType = 'none';
};

export {setSlider, resetSlider};
