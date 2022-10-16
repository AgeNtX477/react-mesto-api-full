import React, { useEffect, useState } from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup (props) {
  const [cardName, setCardName] = useState('')
  const [cardLink, setCardLink] = useState('')

  function handleCardNameChange (e) {
    setCardName(e.target.value)
  }

  function handleCardLinkChange (e) {
    setCardLink(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    props.onAddPlace({
      name: cardName,
      link: cardLink
    })
  }

  useEffect(() => {
    setCardName('')
    setCardLink('')
  }, [props.isOpen])

  return (
    <PopupWithForm
      name={'img-add'}
      title={'Новое место'}
      submitButtonText={'Создать'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      clickOverlay={props.clickOverlay}
    >
      <input
        type='text'
        name='place'
        placeholder='Название'
        className='popup__input popup__input_type_place-name'
        minLength={2}
        maxLength={30}
        value={cardName ? cardName : ''}
        onChange={handleCardNameChange}
        required
      />
      <span
        className='popup__error popup__error_place_place'
        id='place-error'
      />
      <input
        type='url'
        name='url'
        placeholder='Ссылка на картинку'
        className='popup__input popup__input_type_img-src'
        value={cardLink ? cardLink : ''}
        onChange={handleCardLinkChange}
        required
      />
      <span className='popup__error popup__error_place_url' id='url-error' />
    </PopupWithForm>
  )
}

export default AddPlacePopup
