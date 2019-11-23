import React from 'react';
import { filterAds, showUserAds, clearFilter } from '../../actions/adActions';
import { connect } from 'react-redux';

const AdFilter = ({
  auth: { user, isAuthenticated, lang },
  filterAds,
  showUserAds,
  clearFilter
}) => {
  return (
    <div
      className='row center sticky-filter'
      style={{
        marginTop: '0.5rem'
      }}
    >
      <a
        href='#allads'
        className='waves-effect waves-light btn-small cyan'
        onClick={clearFilter}
        style={{ margin: '0.2rem' }}
      >
        {lang === 'en' ? 'All Ads' : 'Все объявления'}
      </a>
      <a
        href='#lost'
        className='waves-effect waves-light btn-small cyan'
        onClick={() => {
          filterAds('lost');
        }}
        style={{ margin: '0.2rem' }}
      >
        {lang === 'en' ? 'Lost' : 'Потерян'}
      </a>
      <a
        href='#found'
        className='waves-effect waves-light btn-small cyan'
        onClick={() => {
          filterAds('found');
        }}
        style={{ margin: '0.2rem' }}
      >
        {lang === 'en' ? 'Found' : 'Найден'}
      </a>
      {isAuthenticated && (
        <a
          href='#myads'
          className='waves-effect waves-light btn-small cyan'
          onClick={() => showUserAds(user._id)}
          style={{ margin: '0.2rem' }}
        >
          {lang === 'en' ? 'My Ads' : 'Мои объявления'}
        </a>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  filterAds,
  showUserAds,
  clearFilter
})(AdFilter);
