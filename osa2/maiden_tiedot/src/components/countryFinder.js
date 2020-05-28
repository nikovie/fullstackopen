import React from 'react'

const Finder = ({query, handleSearch}) => {

  return (
    <div>
      Find countries: <input type="text" value={query} onChange={handleSearch}/>
    </div>
  )
}

export default Finder