import { showPopupFail, showPopupSuccess } from './popup.js';

const API_GET = 'https://25.javascript.pages.academy/kekstagram/data';
const API_POST = 'https://25.javascript.pages.academy/kekstagram';

const createLoader = (onSuccess) => {
  fetch(API_GET)
    .then((response) => response.ok && response.json())
    .then((photos) => onSuccess(photos))
    .catch(() => showPopupFail());
};

const setUserFormSubmit = (formData) => {
  fetch(API_POST, { method: 'POST', formData })
    .then((response) => response.ok ? showPopupSuccess() : showPopupFail())
    .catch(() => showPopupFail());
};

export {createLoader, setUserFormSubmit};
