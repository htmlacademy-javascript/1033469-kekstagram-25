import {min} from './util.js';

const bodyElement = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const pictureList = pictures.children;
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('.social__comment');
const commentsLoaderButton = document.querySelector('.comments-loader');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  commentsLoaderButton.classList.remove('hidden');
};

closeButton.addEventListener('click', () => closeBigPicture());

const handlePictureKeydown = (evt)  => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
  document.removeEventListener('keydown', handlePictureKeydown);
};

const getCommentListElement = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  if (comments.length > 0) {
    const commentList =  comments.split('##');
    for (const comment of commentList) {
      const list = comment.split('$');
      const newElement = commentTemplate.cloneNode(true);
      const img = newElement.querySelector('.social__picture');img.src = comment.avatar;
      img.src = list[0];
      img.alt = list[1];
      newElement.querySelector('.social__text').textContent = list[2];
      commentsFragment.appendChild(newElement);
    }
    return commentsFragment;
  }
};

const getBigPicture = (picture) => {
  if(picture.classList.contains('picture')){
    picture.addEventListener('click', () => {
      bigPicture.classList.remove('hidden');
      bodyElement.classList.add('modal-open');
      const img = bigPicture.querySelector('.big-picture__img img');
      img.src = picture.querySelector('.picture__img').src;
      bigPicture.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
      bigPicture.querySelector('.comments-count').textContent = picture.querySelector('.picture__comments').textContent;

      bigPicture.querySelector('.social__caption').textContent = picture.dataset.description;
      const comments = bigPicture.querySelector('.social__comments');
      while (comments.firstChild) {
        comments.firstChild.remove();
      }
      const allComments = getCommentListElement(picture.dataset.commentList);
      const commentsNumber = picture.querySelector('.picture__comments').textContent;
      let showCommentCounter =  min(5, commentsNumber);
      const commentCount = document.querySelector('.comments-count--showed');
      commentCount.textContent = showCommentCounter;
      commentsLoaderButton.addEventListener('click', () => {
        if (commentsNumber > showCommentCounter) {
          const tmp = min(commentsNumber, showCommentCounter+5);
          for (let i = showCommentCounter; i < tmp; i++) {
            comments.querySelector(`.social__comment:nth-child(${  i })`).classList.remove('hidden');
          }
          showCommentCounter = tmp;
          if (showCommentCounter === commentsNumber) {
            commentsLoaderButton.classList.add('hidden');
          }
          commentCount.textContent = showCommentCounter;
        }
      });

      comments.appendChild(allComments);
      for (let i = 5; i< commentsNumber; i++) {
        comments.querySelector(`.social__comment:nth-child(${  i })`).classList.add('hidden');
      }
      if (showCommentCounter === commentsNumber) {
        commentsLoaderButton.classList.add('hidden');
      }
      document.addEventListener('keydown', handlePictureKeydown);
    });
  }
};

const addPictureEventListeners = () => {
  for (const picture of pictureList) {
    getBigPicture(picture);
  }
};

export {addPictureEventListeners};
