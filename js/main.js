function generateNumber(from, to) {
  if (from >= to) {
    const tmp = from;
    from = to;
    to = tmp;
  }
  return Math.round(from + Math.random() * (to - from));
}

const numberCommentsId = 1000;

const messagesList = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const namesList = ['Амели', 'Афина', 'Бастет', 'Бисквит', 'Валерьян', 'Грейс', 'Джеки', 'Джокер',
  'Жасмин', 'Ирбис', 'Йода', 'Кекс', 'Кефир', 'Конфуций', 'Лаванда', 'Мандарин', 'Марс', 'Одри',
  'Орландо', 'Пончик', 'Рикки', 'Руни', 'Серсея', 'Хеннеси', 'Чарльз', 'Чубака', 'Шаман'];

const photoDescriptionsList = [':)',':(',';)','!','','<3','o_O','-_-'];

const commentsIdList = Array(numberCommentsId+1).fill(false);


function checkLenght(string, maxLength) {
  return string.length <= maxLength;
}

checkLenght('abababab', 5);

function generateRandomList(number) {
  const list = [];
  for (let i = 1; i <= number; i++) {
    list.push(i);
  }
  for (let i = 0; i < number; i++) {
    const j = generateNumber(1, number);
    const tmp = list[i];
    list[i] = list[j];
    list[j] = tmp;
  }
  return list;
}

function generateCommentsList(number) {
  const commentsList = [];
  for (let i = 0; i < number; i++) {
    let id = generateNumber(1, numberCommentsId);
    while (commentsIdList[id]) {
      id = generateNumber(1, numberCommentsId);
    }
    commentsIdList[id] = true;
    const comment = {
      id : id,
      avatar: `img/avatar-${generateNumber(1,6)}.svg`,
      message: messagesList[generateNumber(0, messagesList.length-1)],
      name: namesList[generateNumber(0, namesList.length - 1)]
    };
    commentsList.push(comment);
  }
  return commentsList;
}

function generateDescriptionsList(length) {
  const descriptionsList = [];
  const randomListId = generateRandomList(length);
  const randomListUrl = generateRandomList(length);
  for (let i = 0; i < length; i++) {
    const description = {
      id : randomListId[i],
      url : `photos${randomListUrl[i]}.jpg`,
      description : photoDescriptionsList[generateNumber(0, photoDescriptionsList.length-1)],
      likes: generateNumber(15, 200),
      comments: generateCommentsList(generateNumber(0, 4))
    };
    descriptionsList.push(description);
  }
  return descriptionsList;
}

console.log(generateDescriptionsList(10));
