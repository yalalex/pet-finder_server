import React, { Fragment, useState, useEffect } from 'react';
import Alerts from '../layout/Alerts';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alertActions';
import { register, clearErrors } from '../../actions/authActions';
import { connect } from 'react-redux';

const Register = ({
  auth: { error, isAuthenticated, lang },
  clearErrors,
  register,
  setAlert,
  history
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error === 'User already exists') {
      setAlert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields');
    } else if (password !== password2) {
      setAlert('Passwords do not match');
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <Fragment>
      <Alerts />
      <div
        className='card center card-style'
        style={{
          margin: '20%'
        }}
      >
        <div className='card-content'>
          <span className='card-title'>
            {lang === 'en' ? 'Register' : 'Регистрация'}
          </span>
          <div className='row'>
            <div className='input-field'>
              <input
                placeholder={lang === 'en' ? 'Name' : 'Имя'}
                type='text'
                name='name'
                value={name}
                onChange={onChange}
                required
              />
            </div>
          </div>

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
                minLength='6'
              />
            </div>
          </div>

          <div className='row'>
            <div className='input-field'>
              <input
                placeholder={
                  lang === 'en' ? 'Repeat password' : 'Повторите пароль'
                }
                type='password'
                name='password2'
                value={password2}
                onChange={onChange}
                required
                minLength='6'
              />
            </div>
          </div>
          <div>
            <a
              href='#!'
              onClick={onSubmit}
              className='modal-close waves-effect blue waves-light btn'
            >
              {lang === 'en' ? 'Register' : 'Зарегистрироваться'}
            </a>
          </div>
          <div style={{ marginTop: '2rem' }}>
            {lang === 'en' ? 'Have an account? ' : 'Есть учетная запись? '}
            <Link to='/login'>{lang === 'en' ? 'Log in' : 'Войдите'}.</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { register, clearErrors, setAlert })(
  Register
);
