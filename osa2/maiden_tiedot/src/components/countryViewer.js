import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './capitalWeather'

const BasicInfo = ({country}) => {
  const languages = country.languages.map((language, i) => {
    return <div key={i}>{language.name}</div>
  })

  return (
    <div>
      <h2>{country.name}</h2>
      <div style={{display: "inline-block", verticalAlign: "top"}}>
        <table>
          <thead>
          </thead>
          <tbody>
            <tr>
              <td><strong>Capital</strong></td><td>{country.capital}</td>
            </tr>
            <tr>
              <td><strong>Population</strong></td><td>{country.population}</td>
            </tr>
            <tr>
              <td style={{verticalAlign: "top"}}><strong>Languages</strong></td><td>{languages}</td>
            </tr>
          </tbody>
        </table>

        
      </div>
      <div style={{display: "inline-block", verticalAlign: "top"}}>
        <img src={country.flag} alt="flag" height="100px" width="auto" />
      </div>
    </div>  
  )
}

const ViewCountry = ({country}) => {
  const [weather, updateWeather] = useState({})
  console.log('country details', country)

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current', {
        "params": {
          "access_key": `${process.env.REACT_APP_WEATHERSTACK_KEY}`,
          "units": "m",
          "query": `${country.name}`
        }    
      })
      .then((response)=>{
        console.log('update weather', response.data)
        updateWeather(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })

  }, [country.name])

  if (Object.keys(weather).length) {
    console.log('weather found', weather)

    return (
      <div>
        <BasicInfo country={country} />
        <Weather loc={country} weather={weather} />
      </div>      
    )
  } else {
    console.log('fetching weather...')
    return (
      <BasicInfo country={country} />
    )
  }
};

export default ViewCountry;