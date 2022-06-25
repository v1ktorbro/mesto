import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithDelete } from "../components/PopupWithDelete.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { formObject, configFormPlus, renderLoading } from "../utils/constants.js";

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-12/',
  headers: {
    authorization: '9bd0d0c4-e4a3-422a-9469-bb5b72a2dcf0',
    'Content-Type': 'application/json',
  },
});

const popapImage = new PopupWithImage(".popap-image");
popapImage.setEventListeners();
const popapDelete = new PopupWithDelete(".popap-delete");
popapDelete.setEventListeners();

//  готовим  карточки для рендера
  const defaultCardList = new Section(
    { renderer: ((cardItem, userId) => {
        const card = new Card(
          cardItem,
          '#template-cards',
          userId,
          { handleCardClick: () => {
            popapImage.open(cardItem.name, cardItem.link);
          },
            handleCardDelete: (cardId, cardElem) => {
              popapDelete.open();
              popapDelete.setSubmitAction(() => {
                renderLoading(true, ".popap-delete", "Да")
                api.deleteCard(cardId).then((res) => {
                  if(res.ok) return cardElem.remove();
                  return Promise.reject(`Что-то не так с удалением карточки: ошибка ${res.status}`);
                }).finally(() => popapDelete.close()).catch((err) => {
                  renderLoading(false, ".popap-delete", "Да");
                  return console.log(err);
                });
            });
          },
            handleCardLike: (cardId, cardElem) => {
              const btnLike = cardElem.querySelector(".btn-image_like");
              const likePlaceCount = cardElem.querySelector(".card__count-like");
              if(!btnLike.classList.contains("btn-image_like_active")) {
                api.putLikeCard(cardId).then((res) => {
                  likePlaceCount.textContent = res.likes.length;
                  btnLike.classList.add("btn-image_like_active");
                }).catch((err) => console.log(err));
              } else {
                api.deleteLikeCard(cardId).then((res) => {
                  likePlaceCount.textContent = res.likes.length;
                  btnLike.classList.remove("btn-image_like_active");
                }).catch((err) => console.log(err));
              }
            }
        });
        const cardElement = card.createCard();
		    defaultCardList.addItem(cardElement);
      })
    },
    ".cards");

Promise.all([api.getInitialCards(), api.getInfoUser()])
.then(([initialCards, userData]) => {
  userInfo.setUserInfo(userData);
  initialCards.reverse();
  defaultCardList.renderItems(initialCards, userData._id);
}).catch((err) => console.log(err));

const linkInputAvatar = document.querySelector(".popap-avatar").querySelector(".popap__input-signature"); //инпут ссылки
const btnAvatar = document.querySelector(".profile__avatar"); //кнопка смены аватара
btnAvatar.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  linkInputAvatar.value = info.avatar;
  submitFormAvatar.open();
});

const validateAvatarPopap = new FormValidator(formObject, ".popap-avatar");
validateAvatarPopap.enableValidation();

const submitFormAvatar = new PopupWithForm({
  popapSelector: ".popap-avatar",
  handleFormSubmit: (data) => {
    renderLoading(true, ".popap-avatar", "Сохранить");
    api.changeAvatar(data).then((formData) => userInfo.setUserAvatar(formData)).finally(() => {
      renderLoading(false, ".popap-avatar", "Сохранить");
      submitFormAvatar.close();
    }).catch((err) => console.log(err));
  }
},
validateAvatarPopap);
submitFormAvatar.setEventListeners();

const userInfo = new UserInfo(".profile__name", ".profile__signature", ".profile__avatar");
const btnEdit = document.querySelector(".profile__btn-edit"); //кнопка редактирования профиля
const nameInputProfile = document.querySelector(".popap-edit").querySelector(".popap__input-name"); //инпут имени профиля
const aboutInputProfile = document.querySelector(".popap-edit").querySelector(".popap__input-signature"); //инпут информации "о себе"
btnEdit.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  nameInputProfile.value = info.name;
  aboutInputProfile.value = info.about;
  submitFormEdit.open();
});

const validateEdtitPopap = new FormValidator(formObject, ".popap-edit");
validateEdtitPopap.enableValidation();

const submitFormEdit = new PopupWithForm({
  popapSelector: ".popap-edit",
  handleFormSubmit: (data) => {
    renderLoading(true, ".popap-edit", "Сохранить");
    api.editProfile(data).then((formData) => userInfo.setUserInfo(formData)).finally(() => {
      renderLoading(false, ".popap-edit", "Сохранить");
      submitFormEdit.close();
    }).catch((err) => console.log(err));
  },
},
validateEdtitPopap);
submitFormEdit.setEventListeners()

const btnPlus = document.querySelector(".profile__btn-plus"); //кнопка создания новой карточки
btnPlus.addEventListener("click", () => {
  configFormPlus(".popap-place", formObject);
  submitFormPlus.open();
});

const validatePlusPopap = new FormValidator(formObject, ".popap-place");
validatePlusPopap.enableValidation();

const submitFormPlus = new PopupWithForm({
  popapSelector: '.popap-place',
  handleFormSubmit: (formData) => {
    renderLoading(true, ".popap-place", "Создать")
    api.addCard(formData).then((newCard) => {
    const card = new Card(
      newCard,
      '#template-cards',
      newCard.owner._id,
      { handleCardClick: () => {
          popapImage.open(newCard.name, newCard.link);
        },
        handleCardDelete: (cardId, cardElem) => {
          popapDelete.open();
          popapDelete.setSubmitAction(() => {
            renderLoading(true, ".popap-delete", "Да");
            api.deleteCard(cardId).then((res) => {
              if (res.ok) return cardElem.remove();
              return Promise.reject(`Что-то не так с удалением карточки: ошибка ${res.status}`);
            }).finally(() => popapDelete.close()).catch((err) => {
                renderLoading(false, ".popap-delete", "Да");
                return console.log(err);
            });
          });
        },
        handleCardLike: (cardId, cardElem) => {
          const btnLike = cardElem.querySelector(".btn-image_like");
          const likePlaceCount = cardElem.querySelector(".card__count-like");
          if(!btnLike.classList.contains("btn-image_like_active")) {
            api.putLikeCard(cardId).then((res) => {
              likePlaceCount.textContent = res.likes.length;
              btnLike.classList.add("btn-image_like_active");
            }).catch((err) => console.log(err));
          } else {
            api.deleteLikeCard(cardId).then((res) => {
              likePlaceCount.textContent = res.likes.length;
              btnLike.classList.remove("btn-image_like_active");
            }).catch((err) => console.log(err));
          }
        },
      });
    const cardElement = card.createCard();
    defaultCardList.addItem(cardElement);
  }).finally(() => {
      renderLoading(false, ".popap-place", "Создать");
      submitFormPlus.close();
    }).catch((err) => console.log(err));
  }
},
validatePlusPopap);
submitFormPlus.setEventListeners();
