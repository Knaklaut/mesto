// Класс Api описывает функциональность для обмена данными с сервером
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._likesUrl = `${this._baseUrl}/cards/likes`;
  }

  _checkServerData(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(this._userUrl, {
      headers: this._headers
    })
    .then(this._checkServerData)
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers
    })
    .then(this._checkServerData)
  }

  getInitialData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  updateUserInfo({ name, about }) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about })
    })
    .then(this._checkServerData)
  }

  changeAvatar({ avatar }) {
    return fetch(`${this._userUrl}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: avatar })
    })
    .then(this._checkServerData)
  }

  postNewCard({ name, link }) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link })
    })
    .then(this._checkServerData)
  }

  likeCard(cardId) {
    return fetch(`${this._likesUrl}/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkServerData)
  }

  dislikeCard(cardId) {
    return fetch(`${this._likesUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkServerData)
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkServerData)
  }
}
