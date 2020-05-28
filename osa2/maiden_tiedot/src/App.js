import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Finder from './components/countryFinder'
import Browser from './components/countryBrowser'

const App = () => {
  const [allCountries, updateCountries] = useState([])
  const [searchQuery, filterCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('countries', response.data)
        updateCountries(response.data)
      })
  }, [])
  

  const handleSearch = (event) => {
    console.log('find', event.target.value)
    filterCountries(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h1>Countries</h1>
      <Finder 
        query={searchQuery} 
        handleSearch={handleSearch}
      />
      <Browser 
        filter={searchQuery}
        countries={allCountries}
        handleSearch={handleSearch}
      />
      <div></div>
    </div>
  )

}

export default App