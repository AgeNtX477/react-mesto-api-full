import React, { useContext, useEffect, useState } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup (props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const currentUser = useContext(CurrentUserContext)


  function handleNameChange (e) {
    setName(e.target.value)
  }

  function handleDescriptionChange (e) {
    setDescription(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    props.onUpdateUser({
      name: name,
      about: description
    })
  }

  // при открытии попапа передадим текущие значения пользователя в инпут
  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [props.isOpen, currentUser])

  return (
    <PopupWithForm
      name={'profile-edit'}
      title={'Редактировать профиль'}
      submitButtonText={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      clickOverlay={props.clickOverlay}
    >
      <input
        type='text'
        name='name'
        placeholder='Имя'
        className='popup__input popup__input_type_author'
        minLength={2}
        maxLength={40}
        required
        value={name ? name : ''}
        onChange={handleNameChange}
      />
      <span className='popup__error popup__error_place_name' id='name-error' />
      <input
        type='text'
        name='about'
        placeholder='О себе'
        className='popup__input popup__input_type_description'
        minLength={2}
        maxLength={200}
        required
        value={description ? description : ''}
        onChange={handleDescriptionChange}
      />
      <span
        className='popup__error popup__error_place_about'
        id='about-error'
      />
    </PopupWithForm>
  )
}

export default EditProfilePopup
