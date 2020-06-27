export class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._countLike = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likeCard = this._likeCard.bind(this);
    this._deleteCard = this._deleteCard.bind(this)
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
    //собираем массив лайкнувших
    const countLike = Array.from(this._countLike);
    this._element.querySelector('.card__count-like').textContent = countLike.length
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = `Картинка ${this._name}`;
    this._btnLike = this._element.querySelector('.btn-image_like');
    this._btnDelete = this._element.querySelector('.btn-image_delete');
    this._setEventListeners();
    return this._element;
  }
    _likeCard() {
      this._btnLike.classList.toggle('btn-image_like_active')
    }
    _deleteCard(){
      this._element.remove();
      this._removeEventListeners()
    }
  _setEventListeners() {
    this._cardImage.addEventListener('click', this._handleCardClick);
    this._btnLike.addEventListener('click', this._likeCard);
    this._btnDelete.addEventListener('click', this._deleteCard);
  }
  _removeEventListeners() {
    this._cardImage.removeEventListener('click', this._handleCardClick);
    this._btnLike.removeEventListener('click', this._likeCard);
    this._btnDelete.removeEventListener('click', this._deleteCard)
  }
};
