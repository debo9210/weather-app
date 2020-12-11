import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsideWeather from './AsideWeather';
import Forecast from './Forecasts';
import TodayHighLight from './TodayHighlights';
import Footer from './Footer';
import Loader from './Loader';
import {
  getUserLocation,
  getUserWeather,
  getCurrentWeather,
  getGeoLocation,
} from '../redux/action/WeatherActions';
import { splitDate, dateFormatter } from '../utils/DateFormater';
// import { handleSuccess, handleError } from '../utils/UserGeoLocation';

const WeatherPage = () => {
  const dispatch = useDispatch();

  const [locationName, setLocationName] = useState('');
  const [weatherName, setWeatherName] = useState('');
  const [todayDate, setTodayDate] = useState([]);
  const [currTemp, setCurrTemp] = useState();
  const [weatherAbbr, setWeatherAbbr] = useState('');

  const [windSpeed, setWindSpeed] = useState();
  const [windDir, setWindDir] = useState('');
  const [humidity, setHumidity] = useState('');
  const [visibility, setVisibility] = useState();
  const [airPressure, setAirPressure] = useState();

  const [changeForecast, setChangeForecast] = useState(false);
  const [disableCelsiusBtn, setDisableCelsiusBtn] = useState(false);
  const [disableFahrenheitBtn, setDisableFahrenheitBtn] = useState(false);

  const asideMain = useRef(null);
  const asideSearch = useRef(null);
  const searchResult = useRef(null);
  const celsiusBtn = useRef(null);
  const fahrenheitBtn = useRef(null);
  const errorText = useRef(null);

  const { location } = useSelector((state) => state.locationDetails);

  // console.log(location);

  const { userLocation } = useSelector((state) => state.userLocation);

  const { userWeather, loading } = useSelector((state) => state.userWeather);

  const { currentWeather, error: weatherError } = useSelector(
    (state) => state.weatherDetails
  );

  const { geoLocation } = useSelector((state) => state.currentGeoLocation);

  const getLocationHandler = () => {
    if (location.length === 0) {
      dispatch(getCurrentWeather(11111));
      errorText.current.style.display = 'block';
    } else {
      dispatch(getCurrentWeather(location[0].woeid));

      setTimeout(() => {
        asideSearch.current.style.display = 'none';
        asideMain.current.style.display = 'block';
        // searchResult.current.firstChild.firstChild.textContent = '';
      }, 300);

      errorText.current.style.display = 'none';
      setChangeForecast(true);
    }
  };

  let userForcast;
  if (userWeather) {
    let weatherForecast = userWeather.consolidated_weather.slice(1);
    userForcast = weatherForecast.map((weather) => (
      <Forecast
        key={weather.id}
        day={splitDate(dateFormatter(weather.applicable_date))[0]}
        date={Number(splitDate(dateFormatter(weather.applicable_date))[1])}
        month={splitDate(dateFormatter(weather.applicable_date))[2]}
        image={weather.weather_state_abbr}
        tempHigh={Math.round(weather.max_temp)}
        tempLow={Math.round(weather.min_temp)}
        changeDeg={disableFahrenheitBtn}
      />
    ));
  }

  let searchWeatherForecast;
  if (currentWeather) {
    let weatherForecast = currentWeather.consolidated_weather.slice(1);
    searchWeatherForecast = weatherForecast.map((weather) => (
      <Forecast
        key={weather.id}
        day={splitDate(dateFormatter(weather.applicable_date))[0]}
        date={Number(splitDate(dateFormatter(weather.applicable_date))[1])}
        month={splitDate(dateFormatter(weather.applicable_date))[2]}
        image={weather.weather_state_abbr}
        tempHigh={Math.round(weather.max_temp)}
        tempLow={Math.round(weather.min_temp)}
        changeDeg={disableFahrenheitBtn}
      />
    ));
  }

  const changeCelsiusHandler = () => {
    const celsius = ((Number(currTemp) - 32) * 5) / 9;
    setCurrTemp(Math.round(celsius));
    fahrenheitBtn.current.classList.remove('ChangeDegree');
    celsiusBtn.current.classList.add('ChangeDegree');
    setDisableCelsiusBtn(true);
    setDisableFahrenheitBtn(false);
  };

  const changeFahrenheitHandler = () => {
    const fahrenheit = (Number(currTemp) * 9) / 5 + 32;
    setCurrTemp(Math.round(fahrenheit));
    celsiusBtn.current.classList.remove('ChangeDegree');
    fahrenheitBtn.current.classList.add('ChangeDegree');
    setDisableCelsiusBtn(false);
    setDisableFahrenheitBtn(true);
  };

  const getCurrentLocationWeather = () => {
    const error = JSON.parse(localStorage.getItem('noGeolocation'));

    const geoLocate = JSON.parse(localStorage.getItem('geoLocate'));

    if (error) {
      alert(error);
    } else {
      if (geoLocate) {
        dispatch(getGeoLocation(geoLocate.latitude, geoLocate.longitude));
      }
    }

    if (geoLocation) {
      dispatch(getCurrentWeather(geoLocation[0].woeid));
      // dispatch(getCurrentWeather(44418));
    }

    if (currentWeather) {
      setLocationName(currentWeather.title);
      setWeatherAbbr(currentWeather.consolidated_weather[0].weather_state_abbr);
      setCurrTemp(Math.round(currentWeather.consolidated_weather[0].the_temp));
      setWeatherName(currentWeather.consolidated_weather[0].weather_state_name);
      setTodayDate(dateFormatter(currentWeather.time).split(' ').slice(0, 3));
      setWindSpeed(
        Math.round(currentWeather.consolidated_weather[0].wind_speed)
      );
      setWindDir(currentWeather.consolidated_weather[0].wind_direction_compass);
      setHumidity(Math.round(currentWeather.consolidated_weather[0].humidity));
      setVisibility(
        currentWeather.consolidated_weather[0].visibility.toFixed(1)
      );
      setAirPressure(currentWeather.consolidated_weather[0].air_pressure);
    }
    setChangeForecast(true);
  };

  useEffect(() => {
    if (currentWeather) {
      setLocationName(currentWeather.title);
      setWeatherAbbr(currentWeather.consolidated_weather[0].weather_state_abbr);
      setCurrTemp(Math.round(currentWeather.consolidated_weather[0].the_temp));
      setWeatherName(currentWeather.consolidated_weather[0].weather_state_name);
      setTodayDate(dateFormatter(currentWeather.time).split(' ').slice(0, 3));
      setWindSpeed(
        Math.round(currentWeather.consolidated_weather[0].wind_speed)
      );
      setWindDir(currentWeather.consolidated_weather[0].wind_direction_compass);
      setHumidity(Math.round(currentWeather.consolidated_weather[0].humidity));
      setVisibility(
        currentWeather.consolidated_weather[0].visibility.toFixed(1)
      );
      setAirPressure(currentWeather.consolidated_weather[0].air_pressure);
    }
  }, [currentWeather]);

  useEffect(() => {
    dispatch(getUserLocation());
  }, [dispatch]);

  useEffect(() => {
    if (userLocation) {
      dispatch(getUserWeather(userLocation[0].woeid));
    }
  }, [dispatch, userLocation]);

  useEffect(() => {
    if (userWeather) {
      // console.log(userWeather);

      setLocationName(userWeather.title);
      setWeatherName(userWeather.consolidated_weather[0].weather_state_name);
      // setTodayDate(date.split(' ').slice(0, 3));
      setTodayDate(dateFormatter(userWeather.time).split(' ').slice(0, 3));
      setCurrTemp(Math.round(userWeather.consolidated_weather[0].the_temp));
      setWeatherAbbr(userWeather.consolidated_weather[0].weather_state_abbr);
      setWindSpeed(Math.round(userWeather.consolidated_weather[0].wind_speed));
      setWindDir(userWeather.consolidated_weather[0].wind_direction_compass);
      setHumidity(Math.round(userWeather.consolidated_weather[0].humidity));
      setVisibility(userWeather.consolidated_weather[0].visibility.toFixed(1));
      setAirPressure(userWeather.consolidated_weather[0].air_pressure);

      // console.log(date.split(' ').slice(0, 3));

      setChangeForecast(false);
    }
  }, [userWeather]);

  return (
    <div className='Container'>
      <AsideWeather
        weatherAbbr={weatherAbbr}
        weatherName={weatherName}
        currTemp={currTemp}
        day={todayDate[0]}
        date={Number(todayDate[1])}
        month={todayDate[2]}
        locationName={locationName}
        getCurrWeather={getLocationHandler}
        asideMain={asideMain}
        asideSearch={asideSearch}
        searchResult={searchResult}
        changeDeg={disableFahrenheitBtn}
        errorWeather={weatherError}
        errorText={errorText}
        getCurrentLocation={getCurrentLocationWeather}
      />

      <main className='Main'>
        <nav className='MainNav'>
          <button
            onClick={changeCelsiusHandler}
            className='BtnSwitchDeg'
            ref={celsiusBtn}
            disabled={disableCelsiusBtn}
          >
            &deg;C
          </button>
          <button
            onClick={changeFahrenheitHandler}
            className='BtnSwitchDeg'
            ref={fahrenheitBtn}
            disabled={disableFahrenheitBtn}
          >
            &deg;F
          </button>
        </nav>

        {loading ? (
          <div className='LoaderForecast'>
            <Loader />
          </div>
        ) : (
          <section className='FiveDayForecast'>
            {!changeForecast ? userForcast : searchWeatherForecast}
          </section>
        )}

        {/* <section className='FiveDayForecast'>
            {!changeForecast ? userForcast : searchWeatherForecast}
          </section> */}

        <section className='HighLights'>
          <h3 className='HightLight-Heading'>Today's Hightlights</h3>
          <TodayHighLight
            windSpeed={windSpeed}
            windDir={windDir}
            humidity={humidity}
            visibility={visibility}
            airPressure={airPressure}
          />
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default WeatherPage;
