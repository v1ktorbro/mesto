export class Api {
  constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
  };

  getInfoUser() {
    return fetch(`${this.url}users/me`, {headers: this.headers})
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ошибка ${res.status}`);
    })
  };

  getInitialCards() {
    return fetch(`${this.url}cards`, {headers: this.headers})
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Сбой загрузки карточек: ошибка ${res.status}`);
    })
  };

  editProfile(data) {
    return fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка отправки данных на сервер: проблема ${res.status}`);
    })
  };

  addCard(data) {
    return fetch(`${this.url}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка отправки данных на сервер: проблема ${res.status}`);
    });
  };

  deleteCard(cardId) {
    return fetch(`${this.url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    });
  };

  putLikeCard(cardId) {
    return fetch(`${this.url}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Не удалось поставить лайк карточки: ошибка ${res.status}`);
    });
  };

  deleteLikeCard(cardId) {
    return fetch(`${this.url}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Не удалось убрать лайк с карточки: ошибка ${res.status}`);
    });
  };

  changeAvatar(data) {
    return fetch(`${this.url}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка отправки данных на сервер: проблема ${res.status}`);
    });
  };
}
