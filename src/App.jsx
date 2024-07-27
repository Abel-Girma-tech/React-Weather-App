import React, { useState, useEffect } from 'react';
import './App.css';
import { FaSearch } from 'react-icons/fa';
import { WiFahrenheit } from 'react-icons/wi';
import { IoIosSunny } from 'react-icons/io';
import { FaWind } from 'react-icons/fa';
import axios from 'axios';

function App() {
  const [result, setResult] = useState(null);
  const [nameOfPlace, setPlaceName] = useState('');
  const [query, setQuery] = useState('London');

  useEffect(() => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=6e5f09014f02fd2996c341d5fda6b58d`;
    axios
      .get(API)
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        console.error('Error fetching weather data: ', err);
      });
  }, [query]);

  function onNameInput(e) {
    setPlaceName(e.target.value);
  }

  function onSearch() {
    setQuery(nameOfPlace);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      onSearch();
    }
  }

  return (
    <div id="app">
      <h2 id="weather_app_name">Bella - Weather</h2>
      <div id="search_div">
        <h3 id="search_H_one">Search : </h3>
        <div id="search_area_div">
          <input
            id="search_area_input"
            type="text"
            value={nameOfPlace}
            onChange={onNameInput}
            onKeyDown={handleKeyDown}
            placeholder="Type city, Country, zip Code"
          />
          <FaSearch id="search_icon" onClick={onSearch} />
        </div>
      </div>

      {result && (
        <>
          <div id="weather_result_div">
            <h3>{result.name}</h3>
            <IoIosSunny id="sunny_icon" />
            <h2>{Math.round(result.main.temp - 273.15)}°C</h2>
            <p>{result.weather[0].description}</p>
          </div>
          <div id="results_by_number">
            <p>Feels like: {Math.round(result.main.feels_like - 273.15)}°C</p>
            <p>Temperature: {Math.round(result.main.temp - 273.15)}°C</p>
            <p>Minimum Temp: {Math.round(result.main.temp_min - 273.15)}°C</p>
            <p>Maximum Temp: {Math.round(result.main.temp_max - 273.15)}°C</p>
            <p>Pressure: {result.main.pressure} hPa</p>
            <p>Humidity: {result.main.humidity}%</p>
            <p>
              Wind Speed <FaWind id="wind_speed_icon" />: {result.wind.speed}{' '}
              m/s
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
