import '../pristine/pristine.min.js';
import {setSlider, resetSlider} from './slider.js';
import {setRescale, resetScale} from './rescale.js';
import { setUserFormSubmit } from './fetch.js';

const bodyElement = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const formOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('.img-upload__cancel');

const hashtagElement = form.querySelector('.text__hashtags');
const commentElement = form.querySelector('.text__description');

let firstOpen = true;

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const sliderContainer = document.querySelector('.effect-level');
  sliderContainer.classList.add('hidden');

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});


const closeForm = () => {
  formOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  form.reset();
};

const validateHashtag = (hashtag) => {
  const pattern = /^#[0-9A-Za-zА-Яа-яЁё]{1,19}$/;
  const hashtagList = hashtag.split(' ');
  let result = true;
  let count = 0;
  const hashtags = new Set();
  for (const tag of hashtagList) {
    result = result && (pattern.test(tag) || tag === '');
    // eslint-disable-next-line eqeqeq
    if (tag !== '') {
      count++;
      hashtags.add(tag.toLowerCase());
    }
  }
  result = result && (count <= 5) && (count === hashtags.size);
  return result;
};

const pristine = new Pristine(form, {
  classTo: 'input-container',
  errorTextParent: 'input-container',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
});

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtag,
  'Некорректный хэштег'
);

uploadCancelButton.addEventListener('click', () => closeForm());

const handleFormKeydown = (evt) => {
  if (evt.key === 'Escape' && !document.querySelector('.form-message') && !(hashtagElement === document.activeElement || commentElement === document.activeElement)) {
    closeForm();

    form.removeEventListener('keydown', handleFormKeydown);
  }
};

uploadFile.addEventListener('change', () => {
  if (firstOpen) {
    setRescale();
    setSlider();
    firstOpen = false;
  }
  resetScale();
  resetSlider();
  formOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  bodyElement.addEventListener('keydown', handleFormKeydown);
});


form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  evt.preventDefault();
  if (isValid) {
    const formData = new FormData(evt.target);
    setUserFormSubmit(formData);
  }
});

const handleMessageKeydown = (evt) => {
  if (evt.key === 'Escape' && document.querySelector('.form-message')) {
    const formMessage = document.querySelector('.form-message');
    formMessage.remove();
  }
  document.removeEventListener('keydown', handleFormKeydown);
};

document.addEventListener('keydown', handleMessageKeydown);

export {closeForm};
