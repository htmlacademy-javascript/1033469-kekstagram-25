//import {checkLenght} from './util.js';
import '../pristine/pristine.min.js';
import {setSlider, resetSlider} from './slider.js';
import {setRescale, resetScale} from './rescale.js';

const form = document.querySelector('.img-upload__form');
const formOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');


const uploadFile = document.querySelector('#upload-file');

const uploadCancelButton = document.querySelector('.img-upload__cancel');

setRescale();
setSlider();

const closeForm = () => {
  formOverlay.classList.add('hidden');
};

uploadCancelButton.addEventListener('click', () => closeForm());

form.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !document.querySelector('.form-message')) {
    closeForm();
  }
});

uploadFile.addEventListener('change', () => {
  formOverlay.classList.remove('hidden');
  resetScale();
  resetSlider();
  form.reset();
});

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

//const checkComment = (comment) => checkLenght(comment, 140);

//const button = document.querySelector('.img-upload__control::after');

const pristine = new Pristine(form);

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtag
);

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  let formMessage;
  if (!isValid) {
    evt.preventDefault();
    formMessage =  document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    formMessage.querySelector('.error__button').classList.add('button');
  } else {
    formMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    formMessage.querySelector('.success__button').classList.add('button');
  }
  formMessage.style.zIndex = 10;
  formMessage.classList.add('form-message');
  const formMessageButton = formMessage.querySelector('button');
  formMessageButton.addEventListener('click', () => {
    const message = document.querySelector('.form-message');
    message.remove();
  });
  bodyElement.appendChild(formMessage);
});


document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && document.querySelector('.form-message')) {
    const formMessage = document.querySelector('.form-message');
    formMessage.remove();
  }
});
