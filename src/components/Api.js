import { data } from "autoprefixer";

export class Api {
  constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
  }
  getInfoUser() {
    return fetch(this.url, {headers: this.headers})
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
    return fetch('https://mesto.nomoreparties.co/v1/cohort-12/cards', {
      headers: {
        authorization: '9bd0d0c4-e4a3-422a-9469-bb5b72a2dcf0'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Сбой загрузки карточек: ошибка ${res.status}`)
    })
    .catch(err => console.log(err))
  }
  editProfile(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-12/users/me',{
      method: 'PATCH',
      headers: {
        authorization: '9bd0d0c4-e4a3-422a-9469-bb5b72a2dcf0',
        'Content-Type': 'application/json'
      },
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
    return fetch('https://mesto.nomoreparties.co/v1/cohort-12/cards', {
      method: 'POST',
      headers: {
        authorization: '9bd0d0c4-e4a3-422a-9469-bb5b72a2dcf0',
        'Content-Type': 'application/json'
      },
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
}
