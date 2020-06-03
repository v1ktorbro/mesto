import { sectionCards, popapImage, escHandler } from "./index.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = sectionCards
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _popapImageOpen() {
    popapImage.querySelector('.popap-image__content').src = this._link;
    popapImage.querySelector('.popap-image__name').textContent = this._name;
    popapImage.classList.remove('popap-image_closed');
    document.addEventListener('keydown', escHandler);
  }

  _likeCard() {
    this._element.querySelector('.btn-image_like').classList.toggle('btn-image_like_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners(){
    this._element.querySelector('.card__image').addEventListener('click', ()=> this._popapImageOpen());
    this._element.querySelector('.btn-image_like').addEventListener('click', ()=> this._likeCard());
    this._element.querySelector('.btn-image_delete').addEventListener('click', ()=> this._deleteCard());
  }
};
