import "./index.css";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Section.js";
import { PopupWithForm } from "./components/PopapWithForm.js"
import { Popap } from "./components/Popap.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { UserInfo } from "./components/UserInfo.js";
import {
  formObject, configFormPlus,
  initialCards, overlayPopapImage,
  popaps, btnEdit, btnPlus
} from "./utils/constants.js";

//очищалка ошибок у инпутов формы
function clearInputError(popap, formObject) {
  const form = document.querySelector(popap);
  //кнопка сохранить | создать
  const btnElem = form.querySelector(".popap__input-save");
  const inputsList = Array.from(form.querySelectorAll(".popap__input"));
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
}

//чекаем инпуты при первом открытии формы
function checkInputFirstOpen(popap, formObject) {
  const form = document.querySelector(popap)
  const inputList = Array.from(form.querySelectorAll(".popap__input"));
  inputList.forEach((input) =>{
    if (!input.validity.valid) {
      const errorElement = form.querySelector(`#${input.id}-error`);
      input.classList.add(formObject.inputErrorClass);
      errorElement.classList.add(formObject.errorSpanClass);
      errorElement.textContent = input.validationMessage;
    }
  })
}

function overlayPopap(evt) {
  if (evt.target.classList.contains('popap')) {
    evt.target.classList.add('popap_closed');
  }
  if (evt.target.classList.contains('popap-image')) {
    evt.target.classList.add('popap-image_closed');
  }
};

overlayPopapImage.addEventListener('click', overlayPopap); //оверлей на изображение
popaps.forEach(popap => popap.addEventListener('mousedown', overlayPopap)); //накидываю оверлей на все попапы

const popapImage = new PopupWithImage(".popap-image");
const defaultCardList = new Section(
  { items: initialCards,
    renderer: ((cardItem) => {
      const card = new Card(cardItem,
        '#template-cards',
        { handleCardClick: () => {
          popapImage.open(cardItem.name, cardItem.link);
        }});
      const cardElement = card.createCard();
      defaultCardList.addItem(cardElement);
    })
  },
    ".cards");
defaultCardList.renderItems();

const popapEdit = new Popap(".popap-edit");
const userInfo = new UserInfo(".profile__name", ".profile__signature")

btnEdit.addEventListener("click", ()=> {
  popapEdit.open();
  userInfo.getUserInfo();
  clearInputError(".popap-edit", formObject);
});

const submitFormEdit = new PopupWithForm({
  popapSelector: ".popap-edit",
  handleFormSubmit: () => {
    userInfo.setUserInfo()
  }
})
submitFormEdit.setForm();

const validateEdtitPopap = new FormValidator(formObject, ".popap-edit");
validateEdtitPopap.enableValidation();

const popapPlus = new Popap (".popap-place");
btnPlus.addEventListener("click", ()=> {
  popapPlus.open();
  configFormPlus(".popap-place", formObject);
  checkInputFirstOpen(".popap-place", formObject);
});

const submitFormPlus = new PopupWithForm({
  popapSelector: '.popap-place',
  handleFormSubmit: (formData) => {
    const card = new Card(formData,
      '#template-cards',
      { handleCardClick: () => {
        popapImage.open(formData.name, formData.link);
      }});
    const cardElement = card.createCard();
    defaultCardList.addItem(cardElement);
  }
})
submitFormPlus.setForm();

const validatePlusPopap = new FormValidator(formObject, ".popap-place");
validatePlusPopap.enableValidation();
