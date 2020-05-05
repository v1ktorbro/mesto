const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const sectionCards = document.querySelector('.cards');

function createCards(el, index) {
	const templateCards = document.querySelector('#template-cards').content;
	const cardElement = templateCards.cloneNode(true);
 	cardElement.querySelector('.card__title').textContent = el.name;
  cardElement.querySelector('.card__image').src = el.link;
  cardElement.querySelector('.card__image').alt = el.name;
  cardElement.querySelector('.card').setAttribute('id', index);
  sectionCards.prepend(cardElement);
    //like
  const btnLike = sectionCards.querySelector('.btn-image_like');
  btnLike.addEventListener('click', likeCard);
    // delete
  const btnDelete = sectionCards.querySelector('.btn-image_delete');
  btnDelete.addEventListener('click', deleteCard);
    //лупа
  const btnImage = document.querySelector('.card__image');
  btnImage.addEventListener('click', imageLoupe);

};

initialCards.forEach(createCards);

function imageLoupe(event) {
  const image = event.target.closest('.card__image');
  const popapImage = document.querySelector('.popap-image');
  popapImage.classList.toggle('popap-image_opened');
  const imageSource = popapImage.querySelector('.popap-image__content');
  const imageName = popapImage.querySelector('.popap-image__name');
  imageSource.src = image.src;
  imageName.textContent = image.alt;
  //закрывашка
  const btnClose = popapImage.querySelector('.popap-image__close');
  btnClose.addEventListener('click', () => {
  popapImage.classList.add('popap-image_opened');
  })
}

function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

function likeCard(event) {
  const eventTarget = event.target;
  eventTarget.classList.toggle('btn-image_like_active');
}

//объект формы для кнопки 'edit'
const editFormConfig = {
  formName: 'Редактировать профиль',
  formInputFirst: 'Имя',
  formInputSecond: 'О себе',
  formButton: 'Сохранить'
};

//объект формы для кнопки 'plus'
const plusFormConfig = {
  formName: 'Новое место',
  formInputFirst: 'Название',
  formInputSecond: 'Ссылка на картинку',
  formButton: 'Создать'
};

//переменная, кот-я отвечает за весь popap
const popap = document.querySelector('.popap');
const btnEdit = document.querySelector('.profile__btn-edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__signature');

function formDelPopapClose() {
  if (popap.querySelector('.popap__container')) {
    popap.querySelector('.popap__container').remove();
    popap.classList.add('popap_opened');
  }
};

//создаем ф-ю отвечающую за создание и открытие pop-up окна для кнопки 'btnEdit' и '+'
function formCreate(item) {
  popap.classList.toggle('popap_opened');
  if (!popap.querySelector('.popap__container')) {
    const templatePopap = popap.querySelector('#template-popap').content;
    const popapElement = templatePopap.cloneNode(true);
    popapElement.querySelector('.popap__title').textContent = item.formName;
    popapElement.querySelector('.popap__input-name').placeholder = item.formInputFirst;
    popapElement.querySelector('.popap__input-signature').placeholder = item.formInputSecond;
    popapElement.querySelector('.popap__text-color').textContent = item.formButton;
    popap.append(popapElement);
  }
};

function btnCloseListener() {
  const btnClose = popap.querySelector('.popap__close');
  btnClose.addEventListener('click', formDelPopapClose);
}

function submit(item) {
  const formElement = popap.querySelector('.popap__container');
  formElement.addEventListener('submit', item);
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  formCreate(editFormConfig);
  const nameInput = popap.querySelector('.popap__input-name');
  const jobInput = popap.querySelector('.popap__input-signature');
  if (popap.classList.contains('popap_opened')) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    formDelPopapClose();
  } else {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    submit(formSubmitHandler);
    btnCloseListener();
  }
}

btnEdit.addEventListener('click', formSubmitHandler);


const btnPlus = document.querySelector('.profile__btn-plus');

function addCard(evt) {
  evt.preventDefault();
  formCreate(plusFormConfig);
  const nameInput = popap.querySelector('.popap__input-name');
  const linkInput = popap.querySelector('.popap__input-signature');
  const index = sectionCards.querySelectorAll('.card').length;
  const el = {
    name: nameInput.value,
    link: linkInput.value
  };
  if (popap.classList.contains('popap_opened')) {
    createCards(el, index);
    formDelPopapClose();
  } else {
    submit(addCard);
    btnCloseListener();
  }
}
btnPlus.addEventListener('click', addCard);















