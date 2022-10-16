import React, { useState } from 'react'

function Login (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmailChange (e) {
    setEmail(e.target.value)
  }

  function handlePassChange (e) {
    setPassword(e.target.value)
  }

  function handleLoginSubmit (e) {
    e.preventDefault()
    props.onLogin(email, password)
  }

  return (
    <section className='auth'>
      <h2 className='auth__title'>Вход</h2>
      <form className='auth__form' onSubmit={handleLoginSubmit}>
        <input
          className='auth__input'
          onChange={handleEmailChange}
          placeholder='Email'
          type='email'
          autoComplete='off'
          value={email ? email : ''}
          required
        ></input>
        <input
          className='auth__input'
          onChange={handlePassChange}
          placeholder='Пароль'
          type='password'
          autoComplete='off'
          value={password ? password : ''}
          required
        ></input>
        <button className='auth__submit' type='submit'>
          Войти
        </button>
      </form>
    </section>
  )
}

export default Login
