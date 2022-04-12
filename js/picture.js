import {descriptionList} from './data.js';

const template = document.querySelector('#picture').content;
const newPic = template.querySelector('.picture');
const fragment = document.createDocumentFragment();

const createPicture = (description) => {
  const picture = newPic.cloneNode(true);
  const image = picture.querySelector('.picture__img');
  image.src = description.url;
  const likes = picture.querySelector('.picture__likes');
  likes.textContent = description.likes;
  const comments = picture.querySelector('.picture__comments');
  comments.textContent = description.comments.length;
  fragment.appendChild(picture);
};

for (const description of descriptionList) {
  createPicture(description);
}

const pictures = document.querySelector('.pictures');
pictures.appendChild(fragment);
