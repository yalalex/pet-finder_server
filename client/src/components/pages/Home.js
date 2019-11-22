import React, { useEffect } from 'react';
import MapComp from '../ads/MapComp';
import Ads from '../ads/Ads';
import AdForm from '../ads/AdForm';
import AddBtn from '../ads/AddBtn';
import AdFilter from '../ads/AdFilter';
import { loadUser } from '../../actions/authActions';
import { connect } from 'react-redux';

const Home = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className='col s12 row'>
      <div className='col l8 m7 s12'>
        <MapComp />
        <AdForm />
        <AddBtn />
      </div>
      <div className='col l4 m5 s12'>
        <AdFilter />
        <Ads />
      </div>
    </div>
  );
};

export default connect(null, { loadUser })(Home);
