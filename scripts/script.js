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

function imageLoupe(event) {
  const image = event.target.closest(".card__image");
  const popapImage = document.querySelector(".popap-image");
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
}

function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

function likeCard(event) {
  const eventTarget = event.target;
  eventTarget.classList.toggle("btn-image_like_active");
}

const popapEdit = document.querySelector(".popap-edit");
const btnEdit = document.querySelector(".profile__btn-edit");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__signature");
const nameInput = popapEdit.querySelector(".popap__input-name");
const jobInput = popapEdit.querySelector(".popap__input-signature");

function toggleFormEdit() {
	popapEdit.classList.toggle("popap_opened");
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
 };

function btnCloseListenFormEdit() {
  const btnClose = popapEdit.querySelector(".popap__close");
  btnClose.addEventListener("click", toggleFormEdit);
};
btnCloseListenFormEdit();

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  toggleFormEdit();
};

function submitEditProfile() {
  const formElement = popapEdit.querySelector(".popap__container");
  formElement.addEventListener("submit", formSubmitHandler);
};
submitEditProfile();

btnEdit.addEventListener("click", toggleFormEdit);

const popapPlus = document.querySelector(".popap-place");
const btnPlus = document.querySelector(".profile__btn-plus");
const namePlaceInput = popapPlus.querySelector(".popap__input-name");
const linkPlaceInput = popapPlus.querySelector(".popap__input-signature");

function toggleFormPlus() {
  popapPlus.classList.toggle("popap_opened");
  namePlaceInput.value = '';
  linkPlaceInput.value = '';
};

function btnCloseListenFormPlus() {
  const btnClose = popapPlus.querySelector(".popap__close");
  btnClose.addEventListener("click", toggleFormPlus);
};
btnCloseListenFormPlus();

function addCard(evt) {
  evt.preventDefault();
  const el = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value,
  };
  renderCard(el);
  toggleFormPlus();
};

function submitAddCard() {
  const formElement = popapPlus.querySelector(".popap__container");
  formElement.addEventListener("submit", addCard);
};
submitAddCard();
btnPlus.addEventListener("click", toggleFormPlus);
