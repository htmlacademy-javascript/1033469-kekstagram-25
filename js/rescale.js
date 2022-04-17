const scaleButtonBigger = document.querySelector('.scale__control--bigger');
const scaleButtonSmaller = document.querySelector('.scale__control--smaller');
const scaleControlValue = document.querySelector('.scale__control--value');
const preview = document.querySelector('.img-upload__preview img');

const RESCALE_STEP = 25;
const RESCALE_MAX = 100;
const RESCALE_MIN = 25;

let currentScaleValue = RESCALE_MAX;

const setRescale = () => {
  scaleControlValue.value = `${RESCALE_MAX}%`;
  console.log(scaleControlValue.value);
  currentScaleValue = RESCALE_MAX;
  scaleButtonBigger.addEventListener('click', () => {
    if (currentScaleValue < RESCALE_MAX) {
      currentScaleValue += RESCALE_STEP;
      scaleControlValue.value = `${currentScaleValue}%`;
      preview.style.transform = `scale(${currentScaleValue/100})`;
    }
  });

  scaleButtonSmaller.addEventListener('click', () => {
    if (currentScaleValue > RESCALE_MIN) {
      currentScaleValue -= RESCALE_STEP;
      scaleControlValue.value = `${currentScaleValue}%`;
      preview.style.transform = `scale(${currentScaleValue/100})`;
    }
  });
};

const resetScale = () => {
  preview.style.transform = 'scale(1)';
  scaleControlValue.value =  `${RESCALE_MAX}%`;
  console.log(scaleControlValue.value);
  currentScaleValue = RESCALE_MAX;
};

export {setRescale, resetScale};
