import axios from 'axios';
import {
  GET_LOCATION_FAIL,
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_USER_LOCATION_FAIL,
  GET_USER_LOCATION_REQUEST,
  GET_USER_LOCATION_SUCCESS,
  GET_USER_WEATHER_FAIL,
  GET_USER_WEATHER_REQUEST,
  GET_USER_WEATHER_SUCCESS,
  GET_WEATHER_DETAILS_FAIL,
  GET_WEATHER_DETAILS_REQUEST,
  GET_WEATHER_DETAILS_SUCCESS,
} from '../constants';

// const CORS = 'https://cors-anywhere.herokuapp.com/';

export const getUserLocation = (latt, long) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_LOCATION_REQUEST });

    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/search/?lattlong=${latt},${long}`
    );

    dispatch({
      type: GET_USER_LOCATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_LOCATION_FAIL,
      payload: error.message,
    });
  }
};

export const getUserWeather = (woeid) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_WEATHER_REQUEST });

    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/${woeid}/`
    );

    dispatch({
      type: GET_USER_WEATHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_WEATHER_FAIL,
      payload: error,
    });
  }
};

export const getLocation = (location) => async (dispatch) => {
  try {
    dispatch({ type: GET_LOCATION_REQUEST });

    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/search/?query=${location}`
    );

    dispatch({
      type: GET_LOCATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LOCATION_FAIL,
      payload: error.message,
    });
  }
};

export const getCurrentWeather = (woeid) => async (dispatch) => {
  try {
    dispatch({ type: GET_WEATHER_DETAILS_REQUEST });

    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/${woeid}/`
    );

    dispatch({
      type: GET_WEATHER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_WEATHER_DETAILS_FAIL,
      payload: 'Location does not exist. Try Again!',
    });
  }
};