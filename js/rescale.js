const scaleButtonBigger = document.querySelector('.scale__control--bigger');
const scaleButtonSmaller = document.querySelector('.scale__control--smaller');
const scaleControlValue = document.querySelector('.scale__control--value');
const preview = document.querySelector('.img-upload__preview img');

let currentScaleValue = 100;

const setRescale = () => {
  scaleControlValue.value = '100%';
  currentScaleValue = 100;

  scaleButtonBigger.addEventListener('click', () => {
    if (currentScaleValue < 100) {
      currentScaleValue += 25;
      scaleControlValue.value = `${currentScaleValue}%`;
      preview.style.transform = `scale(${currentScaleValue/100})`;
    }
  });

  scaleButtonSmaller.addEventListener('click', () => {
    if (currentScaleValue > 25) {
      currentScaleValue -= 25;
      scaleControlValue.value = `${currentScaleValue}%`;
      preview.style.transform = `scale(${currentScaleValue/100})`;
    }
  });
};

const resetScale = () => {
  preview.style.transform = 'scale(1)';
  scaleControlValue.value = '100%';
  currentScaleValue = 100;
};

export {setRescale, resetScale};
