import React, { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card (props) {
  // подпишемся на контект пользователя
  const currentUser = useContext(CurrentUserContext)

  // проверим пользовательская ли карточка?
  const isOwn = props.card.owner === currentUser._id

  // проверим поставил ли пользователь карточке лайк
  const isLiked = props.card.likes.some(i => i === currentUser._id)

  // уберем иконку удаления на карточке, которую добавил не currentuser
  const cardDeleteButtonClassName = `element__del-button_visible ${
    !isOwn ? 'element__del-button_hidden' : ''
  }`

  // добавим активную иконку лайк, если пользователь поставил лайк на карточке
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? 'element__like-button_type_active' : ''
  }`

  // обработчик клика по карточе
  function handleClick () {
    props.onCardClick(props.card)
  }

  // обработчик клика по кнопке лайк
  function handleLikeClick () {
    props.onCardLike(props.card)
  }

  // обработчик по кнопке удалить
  function handleDeleteClick () {
    props.onCardDelete(props.card)
  }

  return (
    <article className='element__box'>
      <img
        src={props.link}
        className='element__image'
        alt={props.name}
        onClick={handleClick}
      />
      <div className='element__stuff'>
        <h2 className='element__title'>{props.name}</h2>
        <div className='element__like-container'>
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type='button'
          />
          <span className='element__like-counter'>{props.likes}</span>
        </div>
      </div>
      <button
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        type='button'
      />
    </article>
  )
}

export default Card
