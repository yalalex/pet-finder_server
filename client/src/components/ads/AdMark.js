import React from 'react';
import { Placemark } from 'react-yandex-maps';
import { connect } from 'react-redux';
import { showMarkedAd } from '../../actions/adActions';

const AdMark = ({ ad, showMarkedAd }) => {
  return ad.coords ? (
    <Placemark
      defaultGeometry={[ad.coords.lat, ad.coords.lon]}
      onClick={() => showMarkedAd(ad._id)}
    />
  ) : null;
};

export default connect(null, { showMarkedAd })(AdMark);
