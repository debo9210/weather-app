import {
  GET_LOCATION_FAIL,
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_USER_LOCATION_FAIL,
  GET_USER_LOCATION_REQUEST,
  GET_USER_LOCATION_SUCCESS,
  GET_WEATHER_DETAILS_FAIL,
  GET_WEATHER_DETAILS_REQUEST,
  GET_WEATHER_DETAILS_SUCCESS,
  GET_USER_WEATHER_REQUEST,
  GET_USER_WEATHER_SUCCESS,
  GET_USER_WEATHER_FAIL,
  GET_WEATHER_DETAILS_CLEAR,
} from '../constants';

export const userLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_LOCATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        userLocation: action.payload,
      };
    case GET_USER_LOCATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userLocationWeatherReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_WEATHER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        userWeather: action.payload,
      };
    case GET_USER_WEATHER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const locationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOCATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        location: action.payload,
      };
    case GET_LOCATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const weatherDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_WEATHER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_WEATHER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        currentWeather: action.payload,
      };
    case GET_WEATHER_DETAILS_CLEAR:
      return {
        ...state,
        loading: false,
        currentWeather: action.payload,
      };
    case GET_WEATHER_DETAILS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
