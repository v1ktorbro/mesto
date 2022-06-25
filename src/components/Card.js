export class Card {
  constructor(data, cardSelector, userId, { handleCardClick, handleCardDelete, handleCardLike }) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._authorOfCard = data.owner;
    this._like = data.likes;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike= handleCardLike;
    this._likeCard = this._likeCard.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
  };

  _getTemplate() {
    const sectionCards = document.querySelector(".cards");
    const cardElement = sectionCards.
      querySelector(this._cardSelector).
      content.
      querySelector('.card').
      cloneNode(true);
    return cardElement;
  };

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__count-like').textContent = this._like.length;
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = `Картинка ${this._name}`;
    this._btnLike = this._element.querySelector('.btn-image_like');
    this._btnDelete = this._element.querySelector('.btn-image_delete');
    if(this._authorOfCard._id !== this._userId) this._btnDelete.style.display = 'none';
    if(this._like.some((user) => (user._id === this._userId))) {
      this._btnLike.classList.add("btn-image_like_active")
    }
    this._setEventListeners();
    return this._element;
  };

  _likeCard() {
    this._handleCardLike(this._cardId, this._element)
  };

  _deleteCard() {
    this._handleCardDelete(this._cardId, this._element);
  };

  _setEventListeners() {
    this._cardImage.addEventListener('click', this._handleCardClick);
    this._btnLike.addEventListener('click', this._likeCard);
    this._btnDelete.addEventListener('click', this._deleteCard);
  };
};
