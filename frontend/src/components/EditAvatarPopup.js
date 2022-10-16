import React, { useRef, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup (props) {
  const avatarRef = useRef()

  function handleSubmit (e) {
    e.preventDefault()
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  // при открытии попапа сбросим значение инпутов
  useEffect(() => {
    avatarRef.current.value = ''
  }, [props.isOpen])

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      submitButtonText={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      clickOverlay={props.clickOverlay}
    >
      <input
        ref={avatarRef}
        type='url'
        name='avatar'
        placeholder='Ссылка на аватар'
        className='popup__input popup__input_type_avatar'
        required
      />
      <span
        className='popup__error popup__error_place_avatar'
        id='avatar-error'
      />
    </PopupWithForm>
  )
}

export default EditAvatarPopup
