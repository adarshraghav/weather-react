import React, { useState } from 'react';
import logo from './assets/bf.jpg'
const api = {
  key: "",
  base: "https://api.openweathermap.org/data/2.5/",
  lat: "28.426488993383046",
  lon:"77.03148632322328"
}
function App() {

  const[query, setQuery] = useState('');
  const[weather, setWeather] = useState({});

  const search = evt =>{
    if(evt.key == "Enter"){
      fetch(`${api.base}air_pollution?lat=${api.lat}&lon=${api.lon}&APPID=${api.key}`)
        .then(res=>res.json())
        .then(result=>{
          setWeather(result);
          setQuery('');
          console.log(result)
        })
    }
  }
  const dateBuilder = (d) => {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="app">
      <main>
      <div className='color'>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value = {query}
          onKeyPress={search}
          />
        </div>

        <img src={logo} alt="Logo" className='Logo' />

        
        {(typeof weather.coord != "undefined") ? (
        <div>
          <div className='location-box'>
            <div className='location'>
              Candor TechSpace, HR
            </div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>

          <div className='weather-box'>
            <div className={(Math.round(weather.list[0].main.aqi))>10? "hightemp": "temp"}>
              {(weather.list[0].components.pm10)}
              <div className='aqilabel'>
                Inside AQI
              </div>
            </div> 
          </div>

          <div className='pm2box'>
            <div className="hightemp">
              {(weather.list[0].components.pm2_5)}
              <div className='aqilabel'>
                OutSide AQI
              </div>
            </div> 
          </div>

        </div>
        ) : ('')}
        </div>
      </main>
    </div>
  );
}

export default App;
