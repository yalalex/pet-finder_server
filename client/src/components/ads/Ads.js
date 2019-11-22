import React, { Fragment, useEffect } from 'react';
import AdItem from './AdItem';
import { getAds } from '../../actions/adActions';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';

const Ads = ({ ads: { ads, loading, filtered }, getAds }) => {
  useEffect(() => {
    getAds();
    // eslint-disable-next-line
  }, []);

  if (ads !== null && ads.length === 0 && !loading) {
    return <h4>There are no ads posted yet</h4>;
  }

  return (
    <Fragment>
      {ads !== null && !loading ? (
        filtered !== null ? (
          filtered.map(ad => <AdItem key={ad._id} ad={ad} />)
        ) : (
          ads.map(ad => <AdItem key={ad._id} ad={ad} />)
        )
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  ads: state.ads,
  auth: state.auth
});

export default connect(mapStateToProps, { getAds })(Ads);
