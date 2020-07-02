import { data } from "autoprefixer";

export class Api {
  constructor({url, headers}) {
    this.url = url;
    this.headers = headers
  }
  getInfoUser() {
    return fetch(this.url + 'users/me', {headers: this.headers})
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  getInitialCards() {
    return fetch(this.url + 'cards', {headers: this.headers})
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Сбой загрузки карточек: ошибка ${res.status}`)
    })
    .catch(err => console.log(err))
  }
  editProfile(data) {
    return fetch(this.url + 'users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка отправки данных на сервер: проблема ${res.status}`)
    })
    .catch(err => console.log(err))
  }
  addCard(data) {
    return fetch(this.url + 'cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка отправки данных на сервер: проблема ${res.status}`)
    })
    .catch(err => console.log(err))
  }
  deleteCard(cardId, cardElem) {
      return fetch( this.url + `cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => {
      if(res.ok) {
        return cardElem.remove();
      }
      return Promise.reject(`Что-то не так с удалением карточки: ошибка ${res.status}`)
    })
    .catch(err => console.log(err))
  }
  likeCard(cardId, cardElem) {
    const btnLike = cardElem.querySelector(".btn-image_like");
    const likePlaceCount = cardElem.querySelector(".card__count-like");
    if(!btnLike.classList.contains("btn-image_like_active")) {
      return fetch(this.url + `cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this.headers
      })
      .then(res => {
        if(res.ok) {
          return res.json()
        }
        return Promise.reject(`Не удалось поставить лайк карточки: ошибка ${res.status}`)
      })
      .then((res) => {
		  likePlaceCount.textContent = res.likes.length
        btnLike.classList.add("btn-image_like_active")
		  return
      })
      .catch(err => console.log(err))
    } else {
      return fetch(this.url + `cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => {
        if(res.ok) {
			 return res.json()
        }
        return Promise.reject(`Не удалось убрать лайк с карточки: ошибка ${res.status}`)
		  })
		  .then(res => {
			  likePlaceCount.textContent = res.likes.length;
			  btnLike.classList.remove("btn-image_like_active")
			  return
		  })
      .catch(err => console.log(err))
    }
  }
  changeAvatar(data) {
    return fetch(this.url + 'users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
     .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка отправки данных на сервер: проблема ${res.status}`)
    })
    .catch(err => console.log(err))
  }
}
