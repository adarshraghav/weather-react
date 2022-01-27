import React, { useState } from 'react';
import logo from './assets/bf.jpg'
import logo1 from './assets/VS.jpg'
import bg from './assets/cold-bg.jpeg'
const api = {
  key: "91038c2e26aa8f9c4857f9a7fa83d964",
  base: "https://api.openweathermap.org/data/2.5/",
}
function App() {
  const[query, setQuery] = useState('');
  const[weather, setWeather] = useState({});

  const aqisearch = (evt) =>{
    if(evt.key == "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res=>res.json())
        .then(result=>{
          setWeather(result);
          setQuery('');
          console.log(result);
        })
    }
  }

  const search = evt =>{
    if(evt.key == "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res=>res.json())
        .then(result=>{
          setWeather(result);
          setQuery('');
          console.log(result);
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
      <div className='bg'>
          <img src={bg} alt="Background" className='Background' />
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
        <img src={logo1} alt="Logo1" className='Logo1' />

        
        {(typeof weather.main != "undefined") ? (
        <div>

          <div className='location-box'>
            <div className='location'>
              {weather.name}, 
              {weather.sys.country}
            </div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>

          <div className='weather-box'>
            <div className={(Math.round(weather.main.temp))>10? "hightemp": "temp"}>
              {Math.round(weather.main.temp)}
            </div>
            <div className='weather'>
              {weather.weather[0].main}
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
