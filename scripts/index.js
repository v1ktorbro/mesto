import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { validateEdtitPopap, validatePlusPopap, formObject } from "./FormValidator.js";
export { sectionCards, popapImage, escHandler };

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
  validateEdtitPopap._clearInputError(inputsFormEdit, btnSave);
  document.addEventListener('keydown', escHandler);
};

function closeFormEdit() {
  popapEdit.classList.add("popap_closed");
  configFormEdit();
  validateEdtitPopap._clearInputError(inputsFormEdit, btnSave);
  document.removeEventListener('keydown', escHandler);
};

(function btnCloseListenFormEdit() {
  const btnClose = popapEdit.querySelector(".popap__close");
  btnClose.addEventListener("click", closeFormEdit);
})();

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

function openFormPlus() {
  popapPlus.classList.remove("popap_closed");
  configFormPlus(formObject);
  validatePlusPopap._clearInputError(inputsFormPlus, btnCreate);
  document.addEventListener('keydown', escHandler);
};

function closeFormPlus() {
  popapPlus.classList.add("popap_closed");
  configFormPlus(formObject);
  validatePlusPopap._clearInputError(inputsFormPlus, btnCreate);
  document.removeEventListener('keydown', escHandler);
};

(function btnCloseListenFormPlus() {
  const btnClose = popapPlus.querySelector(".popap__close");
  btnClose.addEventListener("click", closeFormPlus);
})();

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
