//import {descriptionList} from './data.js';
import {createLoader} from './fetch.js';
import {addPictureEventListeners} from './big-picture.js';

const template = document.querySelector('#picture').content;
const newPic = template.querySelector('.picture');
const fragment = document.createDocumentFragment();
let count = 0;

const filterButtons = document.querySelectorAll('.img-filters__button');

const getComments = (comments) => {
  let commentString = '';
  let tmp = 0;
  for (const comment of comments) {
    const newComment = `${comment.avatar}$${comment.name}$${comment.message}`;
    if (tmp > 0) {
      commentString += '##';
    }
    commentString += newComment;
    tmp++;
  }
  return commentString;
};

const createPicture = (description) => {
  const picture = newPic.cloneNode(true);
  const image = picture.querySelector('.picture__img');
  image.src = description.url;
  const likes = picture.querySelector('.picture__likes');
  likes.textContent = description.likes;
  const comments = picture.querySelector('.picture__comments');
  comments.textContent = description.comments.length;
  const comList = getComments(description.comments);
  picture.dataset.commentList = comList;
  picture.dataset.description = description.description;
  fragment.appendChild(picture);
  count++;
};

const createAllPictures = (descriptionList) => {
  for (const description of descriptionList) {
    createPicture(description);
  }
};


createLoader((data) => {
  createAllPictures(data);
  const pictures = document.querySelector('.pictures');
  pictures.appendChild(fragment);
  addPictureEventListeners();
});

