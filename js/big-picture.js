const body = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const pictureList = pictures.children;
const fullPicture = document.querySelector('.big-picture');
const closeButton = fullPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('.social__comment');

const parseComments = (comments) => {
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

const openPicture = (picture) => {
  picture.addEventListener('click', () => {
    fullPicture.classList.remove('hidden');
    fullPicture.querySelector('.social__comment-count').classList.add('hidden');
    fullPicture.querySelector('.comments-loader').classList.add('hidden');
    body.classList.add('modal-open');
    const img = fullPicture.querySelector('.big-picture__img img');
    img.src = picture.querySelector('.picture__img').src;
    fullPicture.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
    fullPicture.querySelector('.comments-count').textContent = picture.querySelector('.picture__comments').textContent;

    fullPicture.querySelector('.social__caption').textContent = picture.dataset.description;
    const comments = fullPicture.querySelector('.social__comments');
    while (comments.firstChild) {
      comments.firstChild.remove();
    }
    const comm = parseComments(picture.dataset.commentList);
    comments.appendChild(comm);
  });
};

for (const picture of pictureList) {
  openPicture(picture);
}

const close = () => {
  fullPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  fullPicture.querySelector('.social__comment-count').classList.remove('hidden');
  fullPicture.querySelector('.comments-loader').classList.remove('hidden');
};

closeButton.addEventListener('click', () => close());

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    close();
  }
});
