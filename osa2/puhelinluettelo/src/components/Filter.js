import React from 'react'

const Filter = ({filtered, persons, searchByName}) => {
  //persons.map((person) => person.names).filter(names => names.includes(searchName))

  return (
    <div>Type name to filter: 
      <input value={filtered} onChange={searchByName}></input>
    </div>
  )
}

export default Filter