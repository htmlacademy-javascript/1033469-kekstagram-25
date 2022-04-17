import '../pristine/pristine.min.js';
import {setSlider, resetSlider} from './slider.js';
import {setRescale, resetScale} from './rescale.js';
import { setUserFormSubmit } from './fetch.js';
import {showPopupFail} from './popup.js';

const form = document.querySelector('.img-upload__form');
const formOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
let firstOpen = true;

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});


const closeForm = () => {
  formOverlay.classList.add('hidden');
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

const pristine = new Pristine(form);

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtag
);


uploadCancelButton.addEventListener('click', () => closeForm());

const handleFormKeydown = (evt) => {
  if (evt.key === 'Escape' && !document.querySelector('.form-message')) {
    closeForm();

    form.removeEventListener('keydown', handleFormKeydown);
  }
};

uploadFile.addEventListener('change', () => {
  form.reset();
  if (firstOpen) {
    setRescale();
    setSlider();
    firstOpen = false;
  }
  resetScale();
  resetSlider();
  formOverlay.classList.remove('hidden');
  form.addEventListener('keydown', handleFormKeydown);
});


// TODO: remove event listeners when need no more

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  evt.preventDefault();
  if (!isValid) {
    showPopupFail();
  } else {
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
