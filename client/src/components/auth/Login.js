import React, { useState, useEffect } from 'react';
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
      history.push('/home');
    }

    if (error === 'Invalid credentials') {
      setAlert(error);
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
      setAlert('Please fill in all fields');
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className='card center card-style' style={{ margin: '20%' }}>
      <div className='card-content'>
        <span className='card-title'>{lang === 'en' ? 'Log In' : 'Вход'}</span>
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
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login, setAlert, clearErrors })(
  Login
);
