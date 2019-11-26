import {
  GET_ADS,
  ADD_AD,
  DELETE_AD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_AD,
  AD_ERROR,
  CLEAR_ADS,
  SHOW_AD_FORM,
  HIDE_AD_FORM,
  CLEAR_FILTER,
  FILTER_ADS,
  USER_ADS,
  SHOW_MARKED_AD
} from '../actions/types';

const initialState = {
  ads: null,
  current: null,
  filtered: null,
  error: null,
  adForm: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ADS:
      return {
        ...state,
        ads: action.payload,
        loading: false
      };
    case ADD_AD:
      return {
        ...state,
        ads: [action.payload, ...state.ads],
        loading: false
      };
    case UPDATE_AD:
      return {
        ...state,
        ads: state.ads.map(ad =>
          ad._id === action.payload._id ? action.payload : ad
        ),
        loading: false
      };
    case DELETE_AD:
      return {
        ...state,
        ads: state.ads.filter(ad => ad._id !== action.payload),
        loading: false
      };
    case CLEAR_ADS:
      return {
        ...state,
        ads: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case USER_ADS:
      return {
        ...state,
        filtered: state.ads.filter(ad => ad.user === action.payload)
      };
    case FILTER_ADS:
      return {
        ...state,
        filtered: state.ads.filter(ad => ad.type === action.payload)
      };
    case SHOW_MARKED_AD:
      return {
        ...state,
        filtered: state.ads.filter(ad => ad._id === action.payload)
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case AD_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SHOW_AD_FORM:
      return {
        ...state,
        adForm: true
      };
    case HIDE_AD_FORM:
      return {
        ...state,
        adForm: false
      };
    default:
      return state;
  }
};
