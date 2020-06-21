import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js"
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  formObject, configFormPlus,
  initialCards, btnEdit, btnPlus
} from "../utils/constants.js";

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

const userInfo = new UserInfo(".profile__name", ".profile__signature")

btnEdit.addEventListener("click", ()=> {
  const info = userInfo.getUserInfo();
  const nameInput = document.querySelector(".popap__input-name");
  nameInput.value = info.name;
  const descriptionInput = document.querySelector(".popap__input-signature");
  descriptionInput.value = info.description;
  submitFormEdit.open();
});
const validateEdtitPopap = new FormValidator(formObject, ".popap-edit");
validateEdtitPopap.enableValidation();

const submitFormEdit = new PopupWithForm({
  popapSelector: ".popap-edit",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData)
  }
},
validateEdtitPopap)
submitFormEdit.setForm();

btnPlus.addEventListener("click", ()=> {
  configFormPlus(".popap-place", formObject);
  submitFormPlus.open();
});

const validatePlusPopap = new FormValidator(formObject, ".popap-place");
validatePlusPopap.enableValidation();

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
},
validatePlusPopap)
submitFormPlus.setForm();

