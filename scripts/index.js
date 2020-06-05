import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
export { sectionCards, popapImage, escHandler };


/* Уважаемый, Антон, кнопка закрытия форм создания карточки и редактирования профиля НЕ проваливается под форму. Так как
по ТЗ у нас макет был только для 1280px, студентам дали возможность сделать адаптив так, как они его видят. По моему мнению,
кнопка закрытия формы расположена удобно для пользователя. Сама форма при этом имеет максимально возможный размер по ширине экрана.
Если делать так как просите Вы, то форма будет менее читабельной, ибо придется уменьшать сам контейнер с формой, чтобы распололожить
кнопку закрытия справа. Кнопка расположена под формой только до 500px.
Поэтому, если у студентов есть свое мнение по поводу замечаний ревью, то я не соглашусь здесь с Вашим замечанием. Спасибо за внимание.*/


const formObject = {
  formSelector: '.popap__container',
  inputSelector: '.popap__input',
  submitButtonSelector: '.popap__input-save', // кнопка 'сохранить' | 'создать'
  inactiveButtonClass: 'popap__input-save_inactive',
  inputErrorClass: 'popap__input-name_type_error', //красная линия под инпутом
  errorSpanClass: 'popap__input-error_active' //span с текстом ошибки
};

//очищалка ошибок у инпутов формы
function clearInputError(inputsList, form, btnElem, formObject) {
  inputsList.forEach((input) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(formObject.inputErrorClass);
    //если в форме если хоть один невалидный инпут и кнопка не содержит класс с инактивацией кнопки
    if (!input.validity.valid && !btnElem.classList.contains(formObject.inactiveButtonClass)) {
      btnElem.classList.add(formObject.inactiveButtonClass);
    } else {
      btnElem.classList.remove(formObject.inactiveButtonClass);}
  })
};

const sectionCards = document.querySelector(".cards");
const popapImage = document.querySelector(".popap-image");

function renderCard(data) {
  const card = new Card(data, '#template-cards');
  const cardElement = card.createCard();
  sectionCards.prepend(cardElement);
};

initialCards.forEach(renderCard);

//закрывашка для изображения. Чтобы не вешать ее каждый раз при создании новый карточки, вынес ее отдельно
const btnCloseImage = popapImage.querySelector(".popap-image__close");
btnCloseImage.addEventListener("click", () => popapImage.classList.add("popap-image_closed"));

const popapEdit = document.querySelector(".popap-edit");
const formEdit = popapEdit.querySelector('.popap__container');
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__signature");
const nameInput = popapEdit.querySelector(".popap__input-name");
const jobInput = popapEdit.querySelector(".popap__input-signature");
const btnSave = popapEdit.querySelector('.popap__input-save');
const inputsFormEdit = Array.from(popapEdit.querySelectorAll('.popap__input'));
const configFormEdit = () => {
	 nameInput.value = profileName.textContent;
   jobInput.value = profileJob.textContent;
};

function openFormEdit() {
  popapEdit.classList.remove("popap_closed");
  configFormEdit();
  clearInputError(inputsFormEdit, formEdit, btnSave, formObject);
  document.addEventListener('keydown', escHandler);
  formEdit.addEventListener('keydown', escHandler);
};

function closeFormEdit() {
  popapEdit.classList.add("popap_closed");
  configFormEdit();
  clearInputError(inputsFormEdit, formEdit, btnSave, formObject);
  document.removeEventListener('keydown', escHandler);
  formEdit.removeEventListener('keydown', escHandler);
};

const btnCloseFormEdit = popapEdit.querySelector(".popap__close");
btnCloseFormEdit.addEventListener("click", closeFormEdit);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeFormEdit();
};

(function submitEditProfile() {
  const formElement = popapEdit.querySelector(".popap__container");
  formElement.addEventListener("submit", formSubmitHandler);
})();

const btnEdit = document.querySelector(".profile__btn-edit");
btnEdit.addEventListener("click", openFormEdit);

const popapPlus = document.querySelector(".popap-place");
const formPlus = popapPlus.querySelector('.popap__container');
const namePlaceInput = popapPlus.querySelector(".popap__input-name");
const linkPlaceInput = popapPlus.querySelector(".popap__input-signature");
const inputsFormPlus = Array.from(popapPlus.querySelectorAll('.popap__input'));
const btnCreate = popapPlus.querySelector('.popap__input-save');
const configFormPlus = (formObject) => {
  namePlaceInput.value = '';
  linkPlaceInput.value = '';
  //т.к в форме создания карточек изначально инфа отсутствует, кнопка будет неактивной при открытии
  btnCreate.classList.add(formObject.inactiveButtonClass);
};

//чекаем инпуты при первом открытии формы
function checkInputFirstOpen(form, inputList) {
  inputList.forEach((input) =>{
    if (!input.validity.valid) {
      const errorElement = form.querySelector(`#${input.id}-error`);
      input.classList.add(formObject.inputErrorClass);
      errorElement.classList.add(formObject.errorSpanClass);
      errorElement.textContent = input.validationMessage;
    }
  })
}

function openFormPlus() {
  popapPlus.classList.remove("popap_closed");
  configFormPlus(formObject);
  checkInputFirstOpen(formPlus, inputsFormPlus);
  document.addEventListener('keydown', escHandler);
  formPlus.addEventListener('keydown', escHandler);
};

function closeFormPlus() {
  popapPlus.classList.add("popap_closed");
  configFormPlus(formObject);
  clearInputError(inputsFormPlus, formPlus, btnCreate, formObject);
  document.removeEventListener('keydown', escHandler);
  formPlus.removeEventListener('keydown', escHandler);
};

const btnCloseFormPlus = popapPlus.querySelector(".popap__close");
btnCloseFormPlus.addEventListener("click", closeFormPlus);

function addCard(evt) {
  evt.preventDefault();
  const data = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value,
  };
  renderCard(data);
  closeFormPlus();
};

(function submitAddCard() {
  const formElement = popapPlus.querySelector(".popap__container");
  formElement.addEventListener("submit", addCard);
})();

const btnPlus = document.querySelector(".profile__btn-plus");
btnPlus.addEventListener("click", openFormPlus);

//ф-я для закртия поп-ап окна клавишей 'Esc'
function escHandler(evt) {
  if (evt.key === 'Escape') {
    popapEdit.classList.add('popap_closed');
    popapPlus.classList.add('popap_closed');
    popapImage.classList.add('popap-image_closed');
    document.removeEventListener('keydown', escHandler);
  }
};

function overlayPopap(evt) {
  if (evt.target.classList.contains('popap')) {
    evt.target.classList.add('popap_closed');
  }
  if (evt.target.classList.contains('popap-image')) {
    evt.target.classList.add('popap-image_closed');
  }
  document.removeEventListener('keydown', escHandler);
};

popapImage.addEventListener('click', overlayPopap);
const popaps = document.querySelectorAll('.popap'); //собираем все попапы чтобы накинуть на них оверлей
popaps.forEach((popap) => {
  popap.addEventListener('mousedown', overlayPopap);
});

const validateEdtitPopap = new FormValidator(formObject, formEdit);
validateEdtitPopap.enableValidation();

const validatePlusPopap = new FormValidator(formObject, formPlus);
validatePlusPopap.enableValidation();
