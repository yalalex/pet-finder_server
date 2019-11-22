import React, { useEffect } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import AdMark from './AdMark';
import { getAds } from '../../actions/adActions';
import { connect } from 'react-redux';

const MapComp = ({ ads: { ads, filtered }, getAds }) => {
  useEffect(() => {
    getAds();
    // eslint-disable-next-line
  }, []);

  return (
    <YMaps>
      <div style={{ height: '400px', margin: '1rem' }}>
        <Map
          defaultState={{
            center: [53.9, 27.55],
            zoom: 11
          }}
          width='100%'
          height='100%'
        >
          {ads !== null
            ? filtered !== null
              ? filtered.map(ad => <AdMark key={ad._id} ad={ad} />)
              : ads.map(ad => <AdMark key={ad._id} ad={ad} />)
            : null}
        </Map>
      </div>
    </YMaps>
  );
};

const mapStateToProps = state => ({
  ads: state.ads
});

export default connect(mapStateToProps, { getAds })(MapComp);
