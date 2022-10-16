import React, { useState, useEffect } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/api'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ProtectedRoute from './ProtectedRoute'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
import auth from '../utils/auth'

function App () {
  // переменные состояния попапов
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = useState(false)
  const [isInfoToolPopupOpen, setInfoToolPopupOpen] = useState(false)

  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const history = useHistory()
  const jwt = localStorage.getItem('jwt')

  // предоставим пользователям закрывать попапы по нажатию на кнопку ESC
  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isEditAvatarPopupOpen ||
      isAddPlacePopupOpen ||
      isInfoToolPopupOpen ||
      selectedCard
    ) {
      function handleEsc (e) {
        if (e.key === 'Escape') {
          closeAllPopups()
        }
      }
      document.addEventListener('keydown', handleEsc)

      return () => {
        document.removeEventListener('keydown', handleEsc)
      }
    }
  }, [
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    isInfoToolPopupOpen,
    selectedCard
  ])

  // функция постановки лайка
  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i === currentUser._id)
    api.changeLikeToggle(card._id, !isLiked, jwt)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards)
    })
    .catch(err => console.log(err))
  }

  // функция удалить карточку
  function handleCardDelete (card) {
    api
      .deleteCard(card._id, jwt)
      .then(() => {
        // создадим новый массив в котором не будет удаленной карточки
        setCards(cards.filter(item => item._id !== card._id))
      })
      .catch(err => console.log(err))
  }

  //Обработчик кнопки просмотра карточки (полный размер)
  function handleCardClick (card) {
    setSelectedCard(card)
    setImagePopupOpen(true)
  }

  //Обработчик кнопки редактирования аватарки
  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true)
  }

  //Обработчик кнопки редактирования инф-ии профиля
  function handleEditProfileClick () {
    setEditProfilePopupOpen(true)
  }

  //Обработчик кнопки добавления карточки
  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true)
  }

  //Обработчик закрытия всех попапов
  function closeAllPopups () {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setImagePopupOpen(false)
    setInfoToolPopupOpen(false)
  }

  // обработчик для обновления данных пользователя
  function handleUpdateUser (data) {
    api
      .editProfile(data.name, data.about, jwt)
      .then(newUserInfo => {
        setCurrentUser(newUserInfo.data)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  // обработчик для обновления аватара пользователя
  function handleUpdateAvatar (data) {
    api
      .changeAvatar(data.avatar, jwt)
      .then(newAvatar => {
        setCurrentUser(newAvatar.data)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  // обработчик для добавления новой карточки
  function handleAddPlaceSubmit (data) {
    api
      .addCard(data, jwt)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  // закрытие попапов кликом по оверлею
  function handleOverlayClick () {
    closeAllPopups()
  }

  // проверим есть ли токен
  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(res => {
          setIsLoggedIn(true)
          setEmail(res.data.email)
          history.push('/')
        })
        .catch(err => {
          if (err.status === 400) {
            console.log('400 — Токен не передан или передан не в том формате')
          } else if (err.status === 401) {
            console.log('401 — Переданный токен некорректен')
          }
        })
    }
  }, [history])

  // функция для логина
  function handleLogin (email, password) {
    auth
      .signIn(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true)
        setEmail(email)
        history.push('/')
      })
      .catch(err => {
        if (err.status === 400) {
          console.log('400 - не передано одно из полей')
        } else if (err.status === 401) {
          console.log('401 - пользователь с email не найден')
        }
      })
  }
  // функция для регистрации
  function handleRegister (email, password) {
    auth
      .signUp(email, password)
      .then(res => {
        setInfoToolPopupOpen(true)
        setIsSuccess(true)
        history.push('/sign-in')
      })
      .catch(err => {
        if (err.status === 400) {
          console.log('400 - некорректно заполнено одно из полей')
        }
        setInfoToolPopupOpen(true)
        setIsSuccess(false)
      })
  }

  // функция для удаления токена (выход из приложения)
  function handleSignOut () {
    localStorage.removeItem('jwt')
    setIsLoggedIn(false)
    history.push('/sign-in')
  }

  // получаем данные пользователя и карточки с сервера
  useEffect(() => {
    if (isLoggedIn) {
    Promise.all([api.getProfile(jwt), api.getInitialCards(jwt)])
      .then(res => {
        const [userData, cardList] = res;
        setCurrentUser(userData.data)
        setCards(cardList.data.reverse())
      })
      .catch(err => console.log(err))
    }
  }, [isLoggedIn, jwt])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='body'>
        <div className='page'>
          <Header email={email} onSignOut={handleSignOut} />

          <Switch>
            <ProtectedRoute
              exact
              path='/'
              isLoggedIn={isLoggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              component={Main}
            />
            <Route path='/sign-in'>
              <Login onLogin={handleLogin} />
            </Route>
            <Route path='/sign-up'>
              <Register onRegister={handleRegister} />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
            </Route>
          </Switch>

          {isLoggedIn && <Footer />}

          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoToolPopupOpen}
            isSuccess={isSuccess}
            clickOverlay={handleOverlayClick}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            clickOverlay={handleOverlayClick}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            clickOverlay={handleOverlayClick}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            clickOverlay={handleOverlayClick}
          />

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
            clickOverlay={handleOverlayClick}
          />
        </div>
        {/* border of page */}
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
