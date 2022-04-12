import {generateNumber, generateRandomList} from './util.js';

const numberCommentsId = 1000;

const messageList = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const nameList = ['Амели', 'Афина', 'Бастет', 'Бисквит', 'Валерьян', 'Грейс', 'Джеки', 'Джокер',
  'Жасмин', 'Ирбис', 'Йода', 'Кекс', 'Кефир', 'Конфуций', 'Лаванда', 'Мандарин', 'Марс', 'Одри',
  'Орландо', 'Пончик', 'Рикки', 'Руни', 'Серсея', 'Хеннеси', 'Чарльз', 'Чубака', 'Шаман'];

const photoDescriptionList = [':)',':(',';)','!','','<3','o_O','-_-'];

const commentIdList = Array(numberCommentsId+1).fill(false);

const generateCommentList = (number) => {
  const commentList = [];
  for (let i = 0; i < number; i++) {
    let id = generateNumber(1, numberCommentsId);
    while (commentIdList[id]) {
      id = generateNumber(1, numberCommentsId);
    }
    commentIdList[id] = true;
    const comment = {
      id : id,
      avatar: `img/avatar-${generateNumber(1,6)}.svg`,
      message: messageList[generateNumber(0, messageList.length-1)],
      name: nameList[generateNumber(0, nameList.length - 1)]
    };
    commentList.push(comment);
  }
  return commentList;
}

const generateDescriptionList = (length) => {
  const descriptions = [];
  const randomListId = generateRandomList(length);
  const randomListUrl = generateRandomList(length);
  for (let i = 0; i < length; i++) {
    const description = {
      id : randomListId[i],
      url : `photos/${randomListUrl[i]}.jpg`,
      description : photoDescriptionList[generateNumber(0, photoDescriptionList.length-1)],
      likes: generateNumber(15, 200),
      comments: generateCommentList(generateNumber(0, 4))
    };
    descriptions.push(description);
  }
  return descriptions;
}

const descriptionList = generateDescriptionList(25);
export {descriptionList};
