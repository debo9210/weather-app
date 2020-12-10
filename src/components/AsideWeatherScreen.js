import React from 'react';

const AsideWeatherScreen = ({
  weatherAbbr,
  currTemp,
  weatherName,
  day,
  date,
  month,
  locationName,
  changeDeg,
  loading,
}) => {
  return (
    <>
      <div className='WeatherScreen'>
        <div className='WeatherImg'>
          <img
            src={`https://www.metaweather.com/static/img/weather/${weatherAbbr}.svg`}
            alt='weather'
          />
        </div>

        <h1>
          {currTemp}
          <span className='AsideDegree'>
            {!changeDeg ? <span>&deg;C</span> : <span>&deg;F</span>}
          </span>
        </h1>

        <p className='WeatherType'>{weatherName}</p>

        <p className='Today'>
          Today . {day}, {date} {month}
        </p>

        <div className='Location'>
          <i className='material-icons LocationIcon'>location_on</i>
          <p className='LocationPlace'>{locationName}</p>
        </div>
      </div>
    </>
  );
};

export default AsideWeatherScreen;
