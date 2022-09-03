import React, { useEffect, useState } from 'react'
import api from './api';
import axios from "axios";
import dateBuilder from './dateBuilder';
import './assets/css/weather.css'

const Weather = () => {
    const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Noida");
  useEffect(() => {
    const fetchApi = async () => {
      let url = `${api.base}weather?q=${search}&appid=${api.key}`;
      try {
        const { data } = await axios.get(url);
        console.log(data);
        setCity(data);
      } catch (error) {
        setCity(null);
      }
    };
    fetchApi();
  }, [search]);
  
  return (
    <div className='weather'>
        <h1 className='w_h1'>Weather App</h1>
      <div className="w_card">
        <div className="search">
          <input type="text" className="search-bar" value={search} onChange={(e)=>{setSearch(e.target.value)}}/> 
        </div>
        {!city ? (
          <p>No Data Found</p>
        ) : (
          <div className="content">
            <h2 className="city">Weather in {search}</h2>
            <p className="date">{dateBuilder(new Date())}</p>
            <h1 className="temp">{Math.round(city.main.temp - 273.15)}°C</h1>
            <img src="" alt="" className="icon" />
            <div className="description text">
              {(city.weather[0].description).toUpperCase()}
            </div>
            <div className="humidity text">Humidity:{city.main.humidity}</div>
            <div className="wind text">Wind Speed:{city.wind.speed} km/hr</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Weather
