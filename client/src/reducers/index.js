import { combineReducers } from 'redux';
import adReducer from './adReducer';
import authReducer from './authReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  ads: adReducer,
  auth: authReducer,
  alerts: alertReducer
});
