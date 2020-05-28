import React from 'react'

const Persons = ({ data, searchName, removeContact }) => {
  const filteredData = data.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))

  const names = filteredData.map((person) => {
    return <div key={person.id}>{person.name}, {person.number} <button onClick={() => removeContact(person.id)}>Delete</button></div>
  })

  return (
    <div>
      {names} 
    </div>
  )
}

export default Persons