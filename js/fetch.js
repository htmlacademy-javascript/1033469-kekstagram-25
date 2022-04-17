/*
4.2. Если при загрузке данных с сервера произошла ошибка запроса, нужно показать соответствующее сообщение. Дизайн блока с сообщением нужно придумать самостоятельно.

4.4. При нажатии на любую из миниатюр, показывается блок .big-picture, содержащий полноэкранное изображение с количеством лайков и комментариев. Элементу body задаётся класс modal-open.
Данные, описывающие изображение, должны подставляться в соответствующие элементы в разметке.нажатия)

4.5. Выход из полноэкранного режима просмотра фотографии осуществляется либо нажатием на иконку крестика .big-picture__cancel в правом верхнем углу блока .big-picture, либо нажатием на клавишу Esc.
У элемента body удаляется класс modal-open.
*/

const createLoader = (onSuccess) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      console.log(response);
    })
    .then((photos) => {
      onSuccess(photos);
    }).catch((err) => console.log(err));
};

const setUserFormSubmit = (formData, onSuccess) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  ).then(() => onSuccess());
};


export {createLoader, setUserFormSubmit};

