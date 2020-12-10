import React from 'react';
import { splitDate, formatDate } from '../utils/DateFormater';

const Forecasts = ({
  day,
  date,
  month,
  image,
  tempHigh,
  tempLow,
  changeDeg,
}) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const TOMORROW = Number(splitDate(formatDate(tomorrow))[2]);

  // console.log({ tempHigh });

  const HIGH = (Number(tempHigh) * 9) / 5 + 32;
  const LOW = (Number(tempLow) * 9) / 5 + 32;
  // const LOW = ((Number(tempLow) - 32) * 5) / 9;

  return (
    <>
      <div className='Forecast'>
        <p className='ForecastDay'>
          {date === TOMORROW ? 'Tomorrow' : `${day}, ${date} ${month}`}
        </p>
        <img
          className='WeatherImage'
          src={`https://www.metaweather.com/static/img/weather/${image}.svg`}
          alt='weather'
        />

        <div className='High-Low'>
          <p className='High'>
            {!changeDeg ? tempHigh : Math.round(HIGH)}
            {!changeDeg ? <span>&deg;C</span> : <span>&deg;F</span>}
          </p>
          <p className='Low'>
            {!changeDeg ? tempLow : Math.round(LOW)}
            {!changeDeg ? <span>&deg;C</span> : <span>&deg;F</span>}
          </p>
        </div>
      </div>
    </>
  );
};

export default Forecasts;
