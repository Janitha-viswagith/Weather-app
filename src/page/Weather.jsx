import React, { useState } from 'react';
import './Weather.css';

function Weather() {
  const [cityInput, setCityInput] = useState("sri lanka");
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "435b99a9ffd543018fa112848240204";

  const search = async () => {
    if (cityInput === "") {
      
        return;
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="search" value={cityInput} onChange={e => setCityInput(e.target.value)} placeholder='Search' />
        <div className="serach-icon">
          <img src="" alt="searchIcon" onClick={search} />
        </div>
      </div>

      {weatherData && (
        <>
          <div className="weather-image">
            <img src={weatherData.current.condition.icon} alt="weather_icon" />
          </div>

          <div className='weather-temp'>{weatherData.current.temp_c}°C</div>

          <div className="weather-location">
            {weatherData.location.name}
          </div>

          <div className="data-container">
            <div className="element">
              <img src="" alt="humidity_icon" className="icon" />
              <div className='data'>
                <div className="humidity-percent">{weatherData.current.humidity}%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src="" alt="wind icon" className="icon" />
              <div className='data'>
                <div className="wind-rate">{weatherData.current.wind_kph}%</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
