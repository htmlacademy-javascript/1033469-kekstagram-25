import {descriptionList} from './data.js';

const body = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const pictureList = pictures.children;
const fullPicture = document.querySelector('.big-picture');
const closeButton = fullPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('.social__comment');

const createComments = (comments) => {
  const fragment = document.createDocumentFragment();
  for (const comment of comments) {
    const newElement = commentTemplate.cloneNode(true);
    const img = newElement.querySelector('.social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    newElement.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(newElement);
  }
  return fragment;
};

const openPicture = (picture, description) => {
  picture.addEventListener('click', () => {
    fullPicture.classList.remove('hidden');
    fullPicture.querySelector('.social__comment-count').classList.add('hidden');
    fullPicture.querySelector('.comments-loader').classList.add('hidden');
    body.classList.add('modal-open');
    const img = fullPicture.querySelector('.big-picture__img img');
    img.src = picture.querySelector('.picture__img').src;
    fullPicture.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
    fullPicture.querySelector('.comments-count').textContent = picture.querySelector('.picture__comments').textContent;

    fullPicture.querySelector('.social__caption').textContent = description.description;
    const comments = fullPicture.querySelector('.social__comments');
    while (comments.firstChild) {
      comments.firstChild.remove();
    }
    comments.appendChild(createComments(description.comments));
  });
};

for (let i = 0; i < pictureList.length; i++) {
  openPicture(pictureList[i], descriptionList[i]);
}

const close = () => {
  fullPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  fullPicture.querySelector('.social__comment-count').classList.remove('hidden');
  fullPicture.querySelector('.comments-loader').classList.remove('hidden');
};

closeButton.addEventListener('click', () => close());

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    close();
  }
});
