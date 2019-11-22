import React from 'react';
import { Placemark } from 'react-yandex-maps';
import { connect } from 'react-redux';
import { showMarkedAd } from '../../actions/adActions';

const AdMark = ({ ad, showMarkedAd }) => {
  return (
    <Placemark
      defaultGeometry={[53.9, 27.55]}
      // defaultGeometry={[ad.coords.lon, ad.coords.lat]}
      onClick={() => showMarkedAd(ad._id)}
    />
  );
};

export default connect(null, { showMarkedAd })(AdMark);
