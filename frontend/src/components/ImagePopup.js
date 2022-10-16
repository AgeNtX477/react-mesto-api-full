import React from 'react'

function ImagePopup (props) {
  return (
    <div
      className={`popup popup_img-zoomed ${props.isOpen ? `popup_opened` : ''}`}
    >
      <div className='popup__zoom-container'>
        <figure className='popup__figure'>
          <img
            src={props.card.link}
            className='popup__image'
            alt={props.card.name}
          />
          <figcaption className='popup__caption'>{props.card.name}</figcaption>
        </figure>
        <button
          className='popup__close-button popup__close-button_place_img-zoomed'
          type='button'
          onClick={props.onClose}
        />
        <div className='popup__overlay popup__overlay_place_img-zoomed' 
        onClick={props.clickOverlay}/>
      </div>
    </div>
  )
}

export default ImagePopup
