import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmailChange (e) {
    setEmail(e.target.value)
  }

  function handlePassChange (e) {
    setPassword(e.target.value)
  }

  function handleRegisterSubmit (e) {
    e.preventDefault()
    props.onRegister(email, password)
  }

  return (
    <section className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form className='auth__form' onSubmit={handleRegisterSubmit}>
        <input
          className='auth__input'
          onChange={handleEmailChange}
          placeholder='Email'
          type='email'
          autoComplete="off"
          value={email ? email : ''}
          required
        ></input>
        <input
          className='auth__input'
          onChange={handlePassChange}
          placeholder='Пароль'
          type='password'
          autoComplete="off"
          value={password ? password : ''}
          required
        ></input>
        <button className='auth__submit' type='submit'>
          Зарегистрироваться
        </button>
        <div className='auth__signcaption'>
          <h4 className='auth__clarification'>Уже зарегистрированы?</h4>
          <Link to='sign-in' className='auth__sign-in-link'>
             Войти
          </Link>
        </div>
      </form>
    </section>
  )
}

export default Register
