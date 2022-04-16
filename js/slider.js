import '../nouislider/nouislider.js';

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const radioElements = document.querySelectorAll('.effects__radio');
const previewImg = document.querySelector('.img-upload__preview img');
let filterType = '';

const setSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
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
                min: 0,
                max: 1,
              },
              start: 1,
              step: 0.1
            });
            filterType = 'grayscale';
            previewImg.style.filter = `${filterType}(1)`;
          }
          if (evt.target.value === 'sepia') {
            sliderElement.noUiSlider.updateOptions({
              range: {
                min: 0,
                max: 1,
              },
              start: 1,
              step: 0.1
            });
            filterType = 'sepia';
            previewImg.style.filter = `${filterType}(1)`;
          }
          if (evt.target.value === 'marvin') {
            sliderElement.noUiSlider.updateOptions({
              range: {
                min: 0,
                max: 100,
              },
              start: 100,
              step: 1
            });
            filterType = 'invert';
            previewImg.style.filter = `${filterType}(100%)`;
          }
          if (evt.target.value === 'phobos') {
            sliderElement.noUiSlider.updateOptions({
              range: {
                min: 0,
                max: 3,
              },
              start: 3,
              step: 0.1
            });
            filterType = 'blur';
            previewImg.style.filter = `${filterType}(3px)`;
          }
          if (evt.target.value === 'heat') {
            sliderElement.noUiSlider.updateOptions({
              range: {
                min: 1,
                max: 3,
              },
              start: 3,
              step: 0.1
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
