import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  locationReducer,
  weatherDetailsReducer,
  userLocationReducer,
  userLocationWeatherReducer,
} from './redux/reducer/WeatherReducers';

const reducers = combineReducers({
  locationDetails: locationReducer,
  weatherDetails: weatherDetailsReducer,
  userLocation: userLocationReducer,
  userWeather: userLocationWeatherReducer,
});

// get user geolocation and store to local storage
const handleSuccess = (position) => {
  const { latitude, longitude } = position.coords;
  const geoLocation = {
    latitude,
    longitude,
  };

  localStorage.setItem('geoLocation', JSON.stringify(geoLocation));
};

const handleError = (error) => {
  localStorage.setItem('error', JSON.stringify(error));
};

navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

//initial store state
const initialState = {};

// middleware to dispatch actions
const middleware = [thunk];

const devTools =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(reducers, initialState, devTools);

export default store;
