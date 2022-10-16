class Api {
  constructor ({baseUrl}) {
    this.baseUrl = baseUrl;
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getProfile (jwt) {
    // получаем данные пользователя с сервера
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  }

  getInitialCards (jwt) {
    // получаем карточки с сервера
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse)
  }

  editProfile (name, about, jwt) {
    // отправляем на сервер данные пользователя
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    }).then(this._checkResponse)
  }

  addCard ({name, link}, jwt) {
    // отправляем на сервер новую карточку
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    }).then(this._checkResponse)
  }

  deleteCard (cardId, jwt) {
    // удаляем карточку с сервера
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    }).then(this._checkResponse)
  }

  _deleteLike (cardId, jwt) {
    // удаляем свой лукас
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    }).then(this._checkResponse)
  }

  _putLike (cardId, jwt) {
    // ставим лукас
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    }).then(this._checkResponse)
  }

  changeLikeToggle (cardId, isLiked, jwt) {
    // переключатель лайка
    if (isLiked) {
      return this._putLike(cardId, jwt);
    } else {
      return this._deleteLike(cardId, jwt);
    }
  }

  changeAvatar (avatar, jwt) {
    // отправляем на сервер данные пользователя
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(this._checkResponse)
  }
} 

const api = new Api({
  baseUrl: 'https://api.agentx.mesto.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api