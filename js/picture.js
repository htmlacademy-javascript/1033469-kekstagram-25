import {createLoader} from './fetch.js';
import {addPictureEventListeners} from './big-picture.js';
import { generateRandomList } from './util.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;
const RANDOM_PICTURE_NUMBER = 10;

const template = document.querySelector('#picture').content;
const newPic = template.querySelector('.picture');
const pictures = document.querySelector('.pictures');
let loadedData = [];

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

const createPicture = (description, fragment) => {
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
};

const deleteAllPictures = () => {
  while (pictures.querySelector('.picture')) {
    pictures.querySelector('.picture').remove();
  }
};

const createAllPictures = (descriptionList) => {
  const fragment = document.createDocumentFragment();
  for (const description of descriptionList) {
    createPicture(description, fragment);
  }
  pictures.appendChild(fragment);
  addPictureEventListeners();
};

const createRandomPictures = (descriptionList) => {
  const fragment = document.createDocumentFragment();
  const tmp = generateRandomList(descriptionList.length);
  for (let i = 0; i < RANDOM_PICTURE_NUMBER; i++) {
    createPicture(descriptionList[tmp[i]-1], fragment);
  }
  pictures.appendChild(fragment);
  addPictureEventListeners();
};

const createDiscussedPictures = (descriptionList) => {
  const fragment = document.createDocumentFragment();
  const sortedDescriptions = descriptionList.slice();
  sortedDescriptions.sort((a, b) => b.comments.length - a.comments.length);
  for (const description of sortedDescriptions) {
    createPicture(description, fragment);
  }
  pictures.appendChild(fragment);
  addPictureEventListeners();
};

createLoader((data) => {
  loadedData = data;
  createAllPictures(data);
});

const filter = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

filter.classList.remove('img-filters--inactive');

filterButtons.forEach((filterButton) => {
  filterButton.addEventListener('click', () => {
    filterButtons.forEach((button) => {button.classList.remove('img-filters__button--active');});
    filterButton.classList.add('img-filters__button--active');
  });
});

const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');

const handleButtonClick = (filterName) => {
  deleteAllPictures();
  switch (filterName) {
    case 'random':
      createRandomPictures(loadedData);
      break;
    case 'discussed':
      createDiscussedPictures(loadedData);
      break;
    default:
      createAllPictures(loadedData);
  }
};

const handleClickDebaunced = debounce(handleButtonClick);

buttonDefault.addEventListener('click', () => {
  handleClickDebaunced('default');
});

buttonRandom.addEventListener('click', () => {
  handleClickDebaunced('random');
});

buttonDiscussed.addEventListener('click', () => {
  handleClickDebaunced('discussed');
});
