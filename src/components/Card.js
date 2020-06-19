export class Card {
  constructor(data, cardSelector,   { handleCardClick }  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick
  }
  _getTemplate() {
    const sectionCards = document.querySelector(".cards");
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
    this._element.querySelector('.card__image').alt = `Картинка ${this._name}`;
    this._setEventListeners();
    return this._element;
  }
  _likeCard() {
    this._element.querySelector('.btn-image_like').classList.toggle('btn-image_like_active');
  }
  _deleteCard() {
    this._element.remove();
  }
  _setEventListeners(){
    this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick());
    this._element.querySelector('.btn-image_like').addEventListener('click', ()=> this._likeCard());
    this._element.querySelector('.btn-image_delete').addEventListener('click', ()=> this._deleteCard());
  }
};
