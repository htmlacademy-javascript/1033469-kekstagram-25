import { closeForm } from './form.js';

const showPopupSuccess = () => {
  const bodyElement = document.querySelector('body');
  const formMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  formMessage.querySelector('.success__button').classList.add('button');
  formMessage.style.zIndex = 10;
  formMessage.classList.add('form-message');
  const formMessageButton = formMessage.querySelector('button');
  formMessageButton.addEventListener('click', () => {
    const message = document.querySelector('.form-message');
    message.remove();
  });
  bodyElement.appendChild(formMessage);
  closeForm();
};

const showPopupFail = () => {
  const bodyElement = document.querySelector('body');
  const formMessage =  document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  formMessage.querySelector('.error__button').classList.add('button');
  formMessage.style.zIndex = 10;
  formMessage.classList.add('form-message');
  const formMessageButton = formMessage.querySelector('button');
  formMessageButton.addEventListener('click', () => {
    const message = document.querySelector('.form-message');
    message.remove();
  });
  bodyElement.appendChild(formMessage);
};

export {showPopupFail, showPopupSuccess};
