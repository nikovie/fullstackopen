import React from 'react'

const Weather = ({loc, weather}) => {
  const capital = loc.capital

  return (
    <div>
      <h3>Current weather in {capital}</h3>
      <div>
        <h4>{weather.current.weather_descriptions.map((desc) => <span key={desc}>{desc}</span>)}, {weather.current.temperature} &deg;C</h4>
        <div style={{display: "inline-block"}}>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>Feels like: </td><td>{weather.current.feelslike} &deg;C</td>
              </tr>
              <tr>
                <td>UV-index: </td><td>{weather.current.uv_index}</td>
              </tr>
              <tr>
                <td>Humidity: </td><td>{weather.current.humidity} %</td>
              </tr>
              <tr>
                <td>Wind speed: </td><td>{weather.current.wind_speed} m/s</td>
              </tr>
              
            </tbody>
            
          </table>
        </div>
        <div style={{display: "inline-block", verticalAlign: "top"}}>
          {weather.current.weather_icons.map((icon) => <img key={icon} src={icon} alt="Weather icon" />)}
        </div>
      </div>
    </div>
  )
}

export default Weather;