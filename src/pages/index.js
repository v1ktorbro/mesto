import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js"
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import {
  formObject, configFormPlus,
  btnEdit, btnPlus
} from "../utils/constants.js";
import { data } from "autoprefixer";

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-12/users/me',
  headers: {
    authorization: '9bd0d0c4-e4a3-422a-9469-bb5b72a2dcf0',
    'Content-Type': 'application/json'
  }
})

api.getInfoUser().then(data => userInfo.setUserInfo(data));
const popapImage = new PopupWithImage(".popap-image");

api.getInitialCards().then((initialCards)=>{
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
		defaultCardList.renderItems()
});

const userInfo = new UserInfo(".profile__name", ".profile__signature");

btnEdit.addEventListener("click", ()=> {
  const info = userInfo.getUserInfo();
  const nameInput = document.querySelector(".popap__input-name");
  nameInput.value = info.name;
  const descriptionInput = document.querySelector(".popap__input-signature");
  descriptionInput.value = info.about;
  submitFormEdit.open();
});
const validateEdtitPopap = new FormValidator(formObject, ".popap-edit");
validateEdtitPopap.enableValidation();

const submitFormEdit = new PopupWithForm({
  popapSelector: ".popap-edit",
  handleFormSubmit: (data) => {
    api.editProfile(data).then(formData => userInfo.setUserInfo(formData))
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
    api.addCard(formData).then(newCard => {
    const card = new Card(newCard,
      '#template-cards',
      { handleCardClick: () => {
        popapImage.open(newCard.name, newCard.link);
      }});
    const cardElement = card.createCard();
    const sectionCard = document.querySelector('.cards');
    sectionCard.prepend(cardElement)
  })
  }
},
validatePlusPopap)
submitFormPlus.setForm();

