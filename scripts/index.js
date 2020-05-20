const sectionCards = document.querySelector(".cards");

function createCard(el) {
  const templateCards = document.querySelector("#template-cards").content;
  const cardElement = templateCards.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = el.name;
  cardElement.querySelector(".card__image").src = el.link;
  cardElement.querySelector(".card__image").alt = el.name;
  return cardElement;
};

function renderCard(el) {
  const card = createCard(el);
  sectionCards.prepend(card);
  //like
  const btnLike = sectionCards.querySelector(".btn-image_like");
  btnLike.addEventListener("click", likeCard);
  // delete
  const btnDelete = sectionCards.querySelector(".btn-image_delete");
  btnDelete.addEventListener("click", deleteCard);
  //лупа
  const btnImage = document.querySelector(".card__image");
  btnImage.addEventListener("click", imageLoupe);
}

initialCards.forEach(renderCard);

// эта константа нужна будет для оверлея, поэтому кидаю в глобальную видимость
const popapImage = document.querySelector(".popap-image");
function imageLoupe(event) {
  const image = event.target.closest(".card__image");
  popapImage.classList.toggle("popap-image_opened");
  const imageSource = popapImage.querySelector(".popap-image__content");
  const imageName = popapImage.querySelector(".popap-image__name");
  imageSource.src = image.src;
  imageName.textContent = image.alt;
  //закрывашка
  const btnClose = popapImage.querySelector(".popap-image__close");
  btnClose.addEventListener("click", () => {
    popapImage.classList.add("popap-image_opened");
  });
  document.addEventListener('keydown', escHandler); //слушатель 'Escape'
};

function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
};

function likeCard(event) {
  const eventTarget = event.target;
  eventTarget.classList.toggle("btn-image_like_active");
};

const popapEdit = document.querySelector(".popap-edit");
const btnEdit = document.querySelector(".profile__btn-edit");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__signature");
const nameInput = popapEdit.querySelector(".popap__input-name");
const jobInput = popapEdit.querySelector(".popap__input-signature");
const btnSave = popapEdit.querySelector('.popap__input-save');
const inputsFormEdit = Array.from(popapEdit.querySelectorAll('.popap__input'));

function openFormEdit() {
  popapEdit.classList.remove("popap_opened");
  configFormEdit();
  clearInputError(inputsFormEdit, popapEdit, btnSave);
  document.addEventListener('keydown', escHandler);
};

function closeFormEdit() {
  popapEdit.classList.add("popap_opened");
  configFormEdit();
  clearInputError(inputsFormEdit, popapEdit, btnSave);
  document.removeEventListener('keydown', escHandler);
};

function toggleFormEdit() {
  popapEdit.classList.toggle("popap_opened");
  configFormEdit();
  clearInputError(inputsFormEdit, popapEdit, btnSave);
};

function configFormEdit() {
	nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

function btnCloseListenFormEdit() {
  const btnClose = popapEdit.querySelector(".popap__close");
  btnClose.addEventListener("click", closeFormEdit);
};
btnCloseListenFormEdit();

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeFormEdit();
};

function submitEditProfile() {
  const formElement = popapEdit.querySelector(".popap__container");
  formElement.addEventListener("submit", formSubmitHandler);
};
submitEditProfile();

btnEdit.addEventListener("click", openFormEdit);

const popapPlus = document.querySelector(".popap-place");
const btnPlus = document.querySelector(".profile__btn-plus");
const namePlaceInput = popapPlus.querySelector(".popap__input-name");
const linkPlaceInput = popapPlus.querySelector(".popap__input-signature");
const inputsFormPlus = Array.from(popapPlus.querySelectorAll('.popap__input'));
const btnCreate = popapPlus.querySelector('.popap__input-save');

function toggleFormPlus() {
  popapPlus.classList.toggle("popap_opened");
  configFormPlus();
  clearInputError(inputsFormPlus, popapPlus, btnCreate);
};

function openFormPlus() {
  popapPlus.classList.remove("popap_opened");
  configFormPlus();
  clearInputError(inputsFormPlus, popapPlus, btnCreate);
  document.addEventListener('keydown', escHandler);
};

function closeFormPlus() {
  popapPlus.classList.add("popap_opened");
  configFormPlus();
  clearInputError(inputsFormPlus, popapPlus, btnCreate);
  document.removeEventListener('keydown', escHandler);
};

function configFormPlus() {
  namePlaceInput.value = '';
  linkPlaceInput.value = '';
  //т.к в форме создания карточек изначально инфа отсутствует, кнопка будет неактивной при открытии
  btnCreate.classList.add('popap__input-save_inactive');
};

function btnCloseListenFormPlus() {
  const btnClose = popapPlus.querySelector(".popap__close");
  btnClose.addEventListener("click", closeFormPlus);
};
btnCloseListenFormPlus();

function addCard(evt) {
  evt.preventDefault();
  const el = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value,
  };
  renderCard(el);
  closeFormPlus();
};

function submitAddCard() {
  const formElement = popapPlus.querySelector(".popap__container");
  formElement.addEventListener("submit", addCard);
};
submitAddCard();
btnPlus.addEventListener("click", openFormPlus);

function checkInputValidity(form, input) {
  if (!input.checkValidity()) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

//проверяем есть ли хоть один невалидный инпут
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.checkValidity();
  })
};

function showInputError(form, input, errorMessage) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add('popap__input-name_type_error');
  errorElement.classList.add('popap__input-error_active');
  errorElement.textContent = errorMessage;
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove('popap__input-name_type_error');
  errorElement.classList.remove('popap__input-error_active');
  errorElement.textContent = '';
};

//очищалка ошибок у инпутов
function clearInputError(inputsList, form, btnElem) {
  inputsList.forEach((input) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove('popap__input-name_type_error');
    //если в форме если хоть один невалидный инпут и кнопка не содержит класс с инактивацией кнопки
    if (hasInvalidInput(inputsList) && !btnElem.classList.contains('popap__input-save_inactive')) {
      btnElem.classList.add('popap__input-save_inactive');
    } else {
      btnElem.classList.remove('popap__input-save_inactive');}
  })
};

const formEdit = popapEdit.querySelector('.popap__container'); //форма редактирования профиля

function toggleButtonState (inputList, btnElem) {
  if(hasInvalidInput(inputList)) {
    btnElem.classList.add('popap__input-save_inactive');
  } else {
    btnElem.classList.remove('popap__input-save_inactive');
  }
};

function setEventListener(form) {
  const inputList = Array.from(form.querySelectorAll('.popap__input'));
  const btnElem = form.querySelector('.popap__input-save');
  toggleButtonState(inputList, btnElem);
  inputList.forEach((input) => {
    input.addEventListener('input', ()=> {
      checkInputValidity(form, input);
      toggleButtonState(inputList, btnElem);
    })
  })
};

const popaps = document.querySelectorAll('.popap'); //собираем все попапы чтобы накинуть на них оверлей

function overlayPopap(evt) {
  if (evt.target.classList.contains('popap')) {
    evt.target.classList.toggle('popap_opened');
  }
  if (evt.target.classList.contains('popap-image')) {
    evt.target.classList.toggle('popap-image_opened');
  }
};

//ф-ю для закртия поп-ап окна клавишей 'Esc'
function escHandler(evt) {
  if (evt.key === 'Escape') {
    popapEdit.classList.add('popap_opened');
    popapPlus.classList.add('popap_opened');
    popapImage.classList.add('popap-image_opened');
  }
};

popapImage.addEventListener('click', overlayPopap);
popaps.forEach((popap) => {
  popap.addEventListener('mousedown', overlayPopap);
});
