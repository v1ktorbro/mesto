import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js"
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithDelete } from "../components/PopupWithDelete.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import {
  formObject, configFormPlus,
  btnEdit, btnPlus, btnAvatar,
  renderLoading
} from "../utils/constants.js";

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-12/',
  headers: {
    authorization: '9bd0d0c4-e4a3-422a-9469-bb5b72a2dcf0',
    'Content-Type': 'application/json'
  }
})
//подгружаем информацию с сервера о user
api.getInfoUser().then(data => userInfo.setUserInfo(data));
const popapImage = new PopupWithImage(".popap-image");
const popapDelete = new PopupWithDelete(".popap-delete", api);

//подгружаем карточки
api.getInitialCards().then((initialCards)=>{
  const defaultCardList = new Section(
    { items: initialCards,
      renderer: ((cardItem) => {
        const card = new Card(cardItem,
          '#template-cards',
          'd33696f46a2c40438bb49993',
          { handleCardClick: () => {
            popapImage.open(cardItem.name, cardItem.link);
          },
            handleCardDelete: (cardId, cardElem) => {
              popapDelete.open(cardId, cardElem)
          },
            handleCardLike: (cardId, cardElem) => {
              api.likeCard(cardId, cardElem)
          }
        });
        const cardElement = card.createCard();
		  defaultCardList.addItem(cardElement);
      })
    },
		".cards");
		defaultCardList.renderItems()
});

btnAvatar.addEventListener("click", ()=> {
  //при каждом открытии инпут формы принимает значение ссылку установленной картинки
  const linkInput = document.querySelector(".popap-avatar").querySelector(".popap__input-signature");
  const info = userInfo.getUserInfo();
  linkInput.value = info.avatar;
  submitFormAvatar.open()
})

const validateAvatarPopap = new FormValidator(formObject, ".popap-avatar");
validateAvatarPopap.enableValidation();

const submitFormAvatar = new PopupWithForm({
  popapSelector: ".popap-avatar",
  handleFormSubmit: (data) => {
    renderLoading(true, ".popap-avatar", "Сохранить")
    api.changeAvatar(data).then(formData => userInfo.setUserAvatar(formData))
    .finally(()=> {
      renderLoading(false, ".popap-avatar", "Сохранить");
      submitFormAvatar.close()
    })
  }
},
validateAvatarPopap)
submitFormAvatar.setForm();

const userInfo = new UserInfo(".profile__name", ".profile__signature", ".profile__avatar");
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
    renderLoading(true, ".popap-edit", "Сохранить")
    api.editProfile(data)
    .then(formData => userInfo.setUserInfo(formData))
    .finally(() => {
      renderLoading(false, ".popap-edit", "Сохранить");
      submitFormEdit.close()
    })
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
    renderLoading(true, ".popap-place", "Создать")
    api.addCard(formData).then(newCard => {
    const card = new Card(newCard,
      '#template-cards',
      'd33696f46a2c40438bb49993',
      { handleCardClick: () => {
        popapImage.open(newCard.name, newCard.link);
        },
        handleCardDelete: (cardId, cardElem) => {
          popapDelete.open(cardId, cardElem)
        },
        handleCardLike: (cardId, cardElem) => {
          api.likeCard(cardId, cardElem)
        }
      });
    const cardElement = card.createCard();
    const sectionCard = document.querySelector('.cards');
    sectionCard.prepend(cardElement)
  })
    .finally(()=> {
    renderLoading(false, ".popap-place", "Создать");
    submitFormPlus.close()
  })
  }
},
validatePlusPopap)
submitFormPlus.setForm();

