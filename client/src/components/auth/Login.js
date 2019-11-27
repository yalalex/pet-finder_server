import React, { Fragment, useState, useEffect } from 'react';
import Alerts from '../layout/Alerts';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alertActions';
import { login, clearErrors } from '../../actions/authActions';
import { connect } from 'react-redux';

const Login = ({
  auth: { error, isAuthenticated, lang },
  clearErrors,
  login,
  setAlert,
  history
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error === 'Invalid credentials') {
      setAlert(lang === 'en' ? error : 'Неверные данные');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert(
        lang === 'en' ? 'Please enter all fields' : 'Заполните все поля'
      );
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <Fragment>
      <Alerts />
      <div className='card center card-style' style={{ marginTop: '20%' }}>
        <div className='card-content'>
          <span className='card-title'>
            {lang === 'en' ? 'Log In' : 'Вход'}
          </span>
          <div className='row'>
            <div className='input-field'>
              <input
                placeholder='Email'
                type='email'
                name='email'
                value={email}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className='row'>
            <div className='input-field'>
              <input
                placeholder={lang === 'en' ? 'Password' : 'Пароль'}
                type='password'
                name='password'
                value={password}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div>
            <a
              href='#!'
              onClick={onSubmit}
              className='modal-close waves-effect blue waves-light btn'
            >
              {lang === 'en' ? 'Log In' : 'Войти'}
            </a>
          </div>
          <div style={{ marginTop: '2rem' }}>
            {lang === 'en' ? 'No account? ' : 'Нету аккаунта? '}
            <Link to='/register'>
              {lang === 'en' ? 'Register' : 'Зарегистрируйтесь'}.
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login, setAlert, clearErrors })(
  Login
);
