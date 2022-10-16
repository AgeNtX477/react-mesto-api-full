import React from 'react'

function PopupWithForm (props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? `popup_opened` : ''
      }`}
    >
      <div className={`popup__${props.name}-container`}>
        <h2 className='popup__heading'>{props.title}</h2>
        <form
          name={props.name}
          className={`popup__form popup__form_place_${props.name}`}
          noValidate=''
          onSubmit={props.onSubmit}
        >
          <fieldset className='popup__form-set'>
            {props.children}
            <button
              className='popup__submit popup__submit_place_avatar'
              type='submit'
            >
              {props.submitButtonText}
            </button>
          </fieldset>
        </form>
        <button
          className={`popup__close-button popup__close-button_place_${props.name}`}
          onClick={props.onClose}
          type='button'
        />
      </div>
      {/* overlay оставлю на будущее, для закрытия клика по оверлею */}
      <div className={`popup__overlay popup__overlay_place_${props.name}`} 
      onClick={props.clickOverlay}
      />
    </div>
  )
}

export default PopupWithForm
