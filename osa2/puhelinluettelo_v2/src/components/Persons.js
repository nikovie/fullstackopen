import React from 'react'

const Persons = ({ data, searchName }) => {
  const filteredData = data.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))

  const names = filteredData.map((person, index) => {
    return <div key={index}>{person.name}, {person.number}</div>
  })

  return (
    <div>
      {names} 
    </div>
  )
}

export default Persons