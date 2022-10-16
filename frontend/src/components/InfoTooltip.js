import React from 'react'
import registerSuccess from '../images/reg-success.svg'
import registerFail from '../images/reg-fail.svg'

function InfoTooltip (props) {
  return (
    <div
      className={`popup popup_infotooltip ${
        props.isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className='popup__tool-container'>
        {props.isSuccess ? (
          <>
            <img
              src={registerSuccess}
              alt='Вы успешно зарегистрировались!'
              className='popup__tool-image'
            />
            <p className='popup__tool-title'>Вы успешно зарегистрировались!</p>
          </>
        ) : (
          <>
            <img
              src={registerFail}
              alt='Что-то пошло не так! Попробуйте ещё раз.'
              className='popup__tool-image'
            />
            <p className='popup__tool-title'>
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}
        <button
          type='button'
          className='popup__close-button popup__close-button_place_tool'
          onClick={props.onClose}
        />
      </div>
      <div
        className='popup__overlay popup__overlay_place_tool'
        onClick={props.clickOverlay}
      />
    </div>
  )
}

export default InfoTooltip
