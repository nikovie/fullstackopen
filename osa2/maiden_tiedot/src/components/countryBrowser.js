import React from 'react'
import ViewCountry from './countryViewer'

const Browser = ({filter, countries, handleSearch }) => {
    
    const query = countries.filter((country) => country.name.toLowerCase().includes(filter))

    if (query.length > 10) {
      return "Found too many, please specify"
    }

    if (query.length === 1) {
      return <ViewCountry country={query[0]} />
    }

    const listCountries = query.map((country, index) => {
      return <div key={index}>{country.name} <button value={country.name} onClick={handleSearch}>show</button></div> 
    })
  
  return (
    <div>
      {listCountries}
    </div>
  )
}

export default Browser