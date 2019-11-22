import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, switchLang } from '../../actions/authActions';
import { clearAds } from '../../actions/adActions';

const Navbar = ({
  auth: { isAuthenticated, lang },
  logout,
  clearAds,
  switchLang
}) => {
  const onLogout = () => {
    logout();
    clearAds();
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/home'>{lang === 'en' ? 'Home' : 'Домой'}</Link>
      </li>
      <li>
        <a onClick={onLogout} href='/home'>
          {lang === 'en' ? 'Log out' : 'Выход'}
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='hide-on-small-and-down'>
        <Link to='/home'>{lang === 'en' ? 'Home' : 'Домой'}</Link>
      </li>
      <li>
        <Link to='/register'>{lang === 'en' ? 'Register' : 'Регистрация'}</Link>
      </li>
      <li>
        <Link to='/login'>{lang === 'en' ? 'Log In' : 'Вход'}</Link>
      </li>
    </Fragment>
  );

  return (
    <nav>
      <div className='nav-wrapper blue'>
        <span className='brand-logo left' style={{ marginLeft: '1rem' }}>
          <Link to='/home'>
            <i className='large material-icons'>pets</i>
          </Link>
        </span>
        <ul id='nav-mobile' className='right'>
          {isAuthenticated ? authLinks : guestLinks}

          <li>
            <div
              className='switch'
              style={{ marginLeft: '1rem', marginRight: '1rem' }}
            >
              <span className={lang === 'ru' ? 'white-text' : 'grey-text'}>
                RU
              </span>
              <label style={{ cursor: 'default' }}>
                <input type='checkbox' />
                <span
                  onClick={switchLang}
                  className='lever'
                  style={{ cursor: 'pointer' }}
                ></span>
              </label>
              <span className={lang === 'en' ? 'white-text' : 'grey-text'}>
                EN
              </span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  ads: state.ads
});

export default connect(mapStateToProps, { logout, clearAds, switchLang })(
  Navbar
);
