import React, { useContext } from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

// стейт-переменные для загрузки данных с сервера, данные пользователя + карточки
function Main (props) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main>
      <section className='profile'>
        <div className='profile__user-container'>
          <img
            src={currentUser.avatar}
            className='profile__avatar'
            alt='Аватар пользователя'
          />
          <button
            onClick={props.onEditAvatar}
            className='profile__avatar-button'
            type='button'
          />
        </div>
        <div className='profile__info'>
          <div className='profile__container'>
            <h1 className='profile__author'>{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              className='profile__edit-button'
              type='button'
            />
          </div>
          <h2 className='profile__description'>{currentUser.about}</h2>
        </div>
        <button
          onClick={props.onAddPlace}
          className='profile__add-button'
          type='button'
        />
      </section>
      <section className='element'>
        {props.cards.map(itinialCards => {
          return (
            <Card
              key={itinialCards._id}
              card={itinialCards}
              name={itinialCards.name}
              link={itinialCards.link}
              likes={itinialCards.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          )
        })}
      </section>
    </main>
  )
}

export default Main
