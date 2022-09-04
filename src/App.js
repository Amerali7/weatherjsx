import React, { useState } from "react";
import './App.css';
import axios from 'axios';

const api = {
  key: "d0c125cc52274ddb6c74c1243946e368",
  base: "https://api.openweathermap.org/data/2.5/",
  icon: "http://openweathermap.org/img/w/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});
 



  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
          
        });
        if (evt.key === "Enter") {
          fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}&cnt=5`)
            .then(res => res.json())
            .then(result => {
              setForecast(result);
              console.log(result);
            });
        }
    }
  }

  const getimg = (imgid) =>{

    return "<img src=http://openweathermap.org/img/wn/"+imgid+"@2x.png>"
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

  const dayofweek = (weekday, i ) => {
    let da = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let checker = weekday.getDay()+i;
    let value = checker - 6;
    if (checker > 6){
      checker = value-1;
    }
    let dayi = da[checker];
    return dayi
  }



  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>

            <div className="forecast">
            
              <div className="temps">
                <div className="forbox">
                <p>
                {dayofweek(new Date(),1)}
                </p>
                  <h1>
                    {Math.round(forecast.list[0].main.temp)}°c
                  </h1>
                  <p>{forecast.list[0].weather[0].main}</p>
                  <p> <img src = {`http://openweathermap.org/img/w/${forecast.list[0].weather[0].icon}.png`}/></p>
                </div>

                <div className="forbox">
                  <p>{dayofweek(new Date(),2)}</p>
                  <h1>{Math.round(forecast.list[1].main.temp)}°c</h1>
                  <p>{forecast.list[1].weather[0].main}</p>
                  <p><img src = {`http://openweathermap.org/img/w/${forecast.list[1].weather[0].icon}.png`}/></p>
                </div>
                <div className="forbox">
                <p>{dayofweek(new Date(),3)}</p>
                  <h1>{Math.round(forecast.list[2].main.temp)}°c</h1>
                  <p>{forecast.list[2].weather[0].main}</p>
                  <p><img src = {`http://openweathermap.org/img/w/${forecast.list[2].weather[0].icon}.png`}/></p>
                </div>
                <div className="forbox">
                <p>{dayofweek(new Date(),4)}</p>
                  <h1>{Math.round(forecast.list[3].main.temp)}°c</h1>
                  <p>{forecast.list[3].weather[0].main}</p>
                  <p><img src = {`http://openweathermap.org/img/w/${forecast.list[3].weather[0].icon}.png`}/></p>
                </div>
                <div className="forbox">
                <p>{dayofweek(new Date(),5)}</p>
                  <h1>{Math.round(forecast.list[4].main.temp)}°c</h1>
                  <p>{forecast.list[4].weather[0].main}</p>
                  <p><img src = {`http://openweathermap.org/img/w/${forecast.list[4].weather[0].icon}.png`}/></p>
                </div>
              </div>
               </div>
               
        <div className="add-info">
                  <div className="add-data">
                  <div className="forbox">
                    <h2>Feels Like</h2>
                    <h1>{weather.main.feels_like}°c</h1>
                  </div>
                  <div className="forbox">
                  <h2>Humidity</h2>
                  <h1>{weather.main.humidity} %</h1>
                  </div>
                  <div className="forbox">
                    <h2>Wind Speed</h2>
                    <h1>{weather.wind.speed} Mph</h1>
                  </div>
                    
                  </div>

              </div>
        </div>
        
        ) : ('')}

      </main>
     
    </div>
   
  );
}

export default App;
