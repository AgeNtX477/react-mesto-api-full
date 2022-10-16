import React from 'react'
import logo from '../images/header-logo.svg'
import { Route, Switch, Link } from 'react-router-dom'

function Header (props) {
  return (
    <header className='header'>
      <img src={logo} className='header__logo' alt='логотип_сайта' />
      <Switch>
        <Route exact path='/sign-in'>
          <Link to='/sign-up' className='header__link'>
            Регистрация
          </Link>
        </Route>
        <Route exact path='/sign-up'>
          <Link to='/sign-in' className='header__link'>
            Войти
          </Link>
        </Route>
        <Route exact path='/'>
          <div className='header__user-box'>
            <p className='header__user-email'>{props.email}</p>
            <Link to='/sign-in' className='header__link header__link_when_logged-in' onClick={props.onSignOut}>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  )
}

export default Header
