import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { showAdForm } from '../../actions/adActions';
import { setAlert } from '../../actions/alertActions';

const AddBtn = ({
  auth: { isAuthenticated, lang },
  ads: { adForm },
  showAdForm,
  setAlert
}) => {
  useEffect(() => {
    adForm ? setBtn('none') : setBtn('block');
  }, [adForm]);

  const [btn, setBtn] = useState('block');

  return isAuthenticated ? (
    <a
      href='#add-form'
      className='btn-floating btn-large deep-orange darken-1'
      onClick={showAdForm}
      style={{ display: btn }}
    >
      <i className='large material-icons'>add</i>
    </a>
  ) : (
    <a
      href='#!'
      onClick={() =>
        setAlert(
          lang === 'en'
            ? 'You have to be logged in to post your ad'
            : 'Войдите, чтобы разместить объявление'
        )
      }
      className='btn-floating btn-large deep-orange darken-2'
      style={{ display: btn }}
    >
      <i className='large material-icons'>add</i>
    </a>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  ads: state.ads
});

export default connect(mapStateToProps, { showAdForm, setAlert })(AddBtn);
