const sectionCards = document.querySelector(".cards");
const templateCards = document.querySelector("#template-cards").content;

function createCard(el) {
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
  popapImage.classList.toggle("popap-image_closed");
  const imageSource = popapImage.querySelector(".popap-image__content");
  const imageName = popapImage.querySelector(".popap-image__name");
  imageSource.src = image.src;
  imageName.textContent = image.alt;
  document.addEventListener('keydown', escHandler);
};

//закрывашка для изображения
const btnCloseImage = popapImage.querySelector(".popap-image__close");
btnCloseImage.addEventListener("click", () => popapImage.classList.add("popap-image_closed"));

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
const configFormEdit = () => {
	nameInput.value = profileName.textContent;
   jobInput.value = profileJob.textContent;
};

function openFormEdit() {
  popapEdit.classList.remove("popap_closed");
  configFormEdit();
  clearInputError(inputsFormEdit, popapEdit, btnSave, formObject);
  document.addEventListener('keydown', escHandler);
};

function closeFormEdit() {
  popapEdit.classList.add("popap_closed");
  configFormEdit();
  clearInputError(inputsFormEdit, popapEdit, btnSave, formObject);
  document.removeEventListener('keydown', escHandler);
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
const configFormPlus = (formObject) => {
  namePlaceInput.value = '';
  linkPlaceInput.value = '';
  //т.к в форме создания карточек изначально инфа отсутствует, кнопка будет неактивной при открытии
  btnCreate.classList.add(formObject.inactiveButtonClass);
};

function openFormPlus() {
  popapPlus.classList.remove("popap_closed");
  configFormPlus(formObject);
  clearInputError(inputsFormPlus, popapPlus, btnCreate, formObject);
  document.addEventListener('keydown', escHandler);
};

function closeFormPlus() {
  popapPlus.classList.add("popap_closed");
  configFormPlus(formObject);
  clearInputError(inputsFormPlus, popapPlus, btnCreate, formObject);
  document.removeEventListener('keydown', escHandler);
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
