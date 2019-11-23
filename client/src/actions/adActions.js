import axios from 'axios';
import {
  GET_ADS,
  ADD_AD,
  DELETE_AD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_AD,
  AD_ERROR,
  CLEAR_ADS,
  HIDE_AD_FORM,
  SHOW_AD_FORM,
  FILTER_ADS,
  USER_ADS,
  CLEAR_FILTER,
  SHOW_MARKED_AD
} from './types';

// Get ADs
export const getAds = () => async dispatch => {
  try {
    const res = await axios.get('/api/ads');

    dispatch({
      type: GET_ADS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: err.response.msg
    });
  }
};

// Add AD
export const addAd = ad => async dispatch => {
  try {
    const geoCoder = await fetch(
      `https://eu1.locationiq.com/v1/search.php?key=62c578d5c7451a&q=${ad.address}+Minsk+Belarus&format=json`
    );
    const geo = await geoCoder.json();
    ad.coords.lat = geo[0].lat;
    ad.coords.lon = geo[0].lon;
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: 'Please enter valid address'
    });
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/ads', ad, config);

    dispatch({
      type: ADD_AD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: err.response.msg
    });
  }
};

// Delete AD
export const deleteAd = id => async dispatch => {
  try {
    await axios.delete(`/api/ads/${id}`);

    dispatch({
      type: DELETE_AD,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: err.response.msg
    });
  }
};

// Update AD
export const updateAd = ad => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/ads/${ad._id}`, ad, config);

    dispatch({
      type: UPDATE_AD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AD_ERROR,
      payload: err.response.msg
    });
  }
};

// Clear ADs
export const clearAds = () => {
  return { type: CLEAR_ADS };
};

// Set Current AD
export const setCurrent = ad => {
  return { type: SET_CURRENT, payload: ad };
};

// Clear Current AD
export const clearCurrent = () => {
  return { type: CLEAR_CURRENT };
};

//Show AD form below map
export const showAdForm = () => {
  return { type: SHOW_AD_FORM };
};

//Hide AD form below map
export const hideAdForm = () => {
  return { type: HIDE_AD_FORM };
};

// Filter ADs
export const filterAds = text => {
  return { type: FILTER_ADS, payload: text };
};

// Show user ADs
export const showUserAds = id => {
  return { type: USER_ADS, payload: id };
};

//Show Ad Selected on Map
export const showMarkedAd = id => {
  return { type: SHOW_MARKED_AD, payload: id };
};

export const clearFilter = () => {
  return { type: CLEAR_FILTER };
};
