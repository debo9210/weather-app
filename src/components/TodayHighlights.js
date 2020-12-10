import React from 'react';

const TodayHighlights = ({
  windSpeed,
  windDir,
  humidity,
  visibility,
  airPressure,
}) => {
  const navDir = document.querySelector('.NavigationIcon');

  // if (windDir === 'N') {
  //   navDir.style.display = 'block';
  //   navDir.style.transform = 'rotate(90deg)';
  // }
  //change navigation directions

  if (navDir) {
    switch (windDir) {
      case 'N':
        navDir.style.transform = 'rotate(0deg)';
        break;
      case 'NNE':
        navDir.style.transform = 'rotate(22.5deg)';
        break;
      case 'NE':
        navDir.style.transform = 'rotate(45deg)';
        break;
      case 'ENE':
        navDir.style.transform = 'rotate(67.5deg)';
        break;
      case 'E':
        navDir.style.transform = 'rotate(90deg)';
        break;
      case 'ESE':
        navDir.style.transform = 'rotate(112.5deg)';
        break;
      case 'SE':
        navDir.style.transform = 'rotate(135deg)';
        break;
      case 'SSE':
        navDir.style.transform = 'rotate(157.5deg)';
        break;
      case 'S':
        navDir.style.transform = 'rotate(180deg)';
        break;
      case 'SSW':
        navDir.style.transform = 'rotate(202.5deg)';
        break;
      case 'SW':
        navDir.style.transform = 'rotate(225deg)';
        break;
      case ' WSW':
        navDir.style.transform = 'rotate(247.5deg)';
        break;
      case 'W':
        navDir.style.transform = 'rotate(270deg)';
        break;
      case 'WNW':
        navDir.style.transform = 'rotate(292.5deg)';
        break;
      case 'NW':
        navDir.style.transform = 'rotate(315deg)';
        break;
      case 'NNW':
        navDir.style.transform = 'rotate(337.5deg)';
        break;
      default:
        navDir.style.transform = 'rotate(0deg)';
    }
  }

  return (
    <div className='Today-HighLights-Container'>
      <div className='Today-HighLights Upper'>
        <p className='WeatherStatus'>Wind status</p>
        <h3 className='WeatherNum'>
          {windSpeed}
          <span className='StatusType'>mph</span>
        </h3>
        <div className='WeatherWindContainer'>
          <i className='material-icons NavigationIcon'>navigation</i>
          <small className='WeatherWind'>{windDir}</small>
        </div>
      </div>

      <div className='Today-HighLights Upper'>
        <p className='WeatherStatus'>Humidity</p>
        <h3 className='WeatherNum'>
          {humidity}
          <span className='StatusType'>&#37;</span>
        </h3>
        <div className='ProgressBarContainer'>
          <div className='PercentageNum'>
            <small>0</small>
            <small>50</small>
            <small>100</small>
          </div>
          <div className='ProgressBar'>
            <div className='Progress' style={{ width: `${humidity}%` }}></div>
          </div>
          <p className='Perce'>&#37;</p>
        </div>
      </div>

      <div className='Today-HighLights Lower'>
        <p className='WeatherStatus'>Visibility</p>
        <h3 className='WeatherNum'>
          {visibility} <span className='StatusType'>miles</span>
        </h3>
      </div>

      <div className='Today-HighLights Lower'>
        <p className='WeatherStatus'>Air Pressure</p>
        <h3 className='WeatherNum'>
          {airPressure} <span className='StatusType'>mb</span>
        </h3>
      </div>
    </div>
  );
};

export default TodayHighlights;
