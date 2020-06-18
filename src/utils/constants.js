export {
  formObject, configFormPlus,
  initialCards, overlayPopapImage,
  popaps, btnEdit, btnPlus
};

const formObject = {
  formSelector: '.popap__container',
  inputSelector: '.popap__input',
  submitButtonSelector: '.popap__input-save', // кнопка 'сохранить' | 'создать'
  inactiveButtonClass: 'popap__input-save_inactive',
  inputErrorClass: 'popap__input-name_type_error', //красная линия под инпутом
  errorSpanClass: 'popap__input-error_active' //span с текстом ошибки
};

const configFormPlus = (popap, formObject) => {
  const form = document.querySelector(popap);
  const inputList = form.querySelectorAll(".popap__input");
  inputList.forEach(input => input.value = "");
  //т.к в форме создания карточек изначально инфа отсутствует, кнопка будет неактивной при открытии
  const btnCreate = form.querySelector(".popap__input-save")
  btnCreate.classList.add(formObject.inactiveButtonClass);
};

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const overlayPopapImage = document.querySelector(".popap-image"); //для оверлея
const popaps = document.querySelectorAll('.popap');               //анологично^^^
const btnEdit = document.querySelector(".profile__btn-edit"); //кнопка редактирования профиля
const btnPlus = document.querySelector(".profile__btn-plus"); //кнопка создания новой карточки
