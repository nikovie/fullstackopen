import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/AddPerson'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filtered, searchName ] = useState('')

  const searchByName = (event) => {
    console.log('filternames', event.target.value)
    searchName(event.target.value)
  }

  const addPerson = (event) => {
    // prevent submit with default values
    event.preventDefault();
    if (newName === undefined || newName === "") { return }

    if (checkDuplicates(persons, newName)) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    setPersons(persons.concat({ name: newName, number: newNum }))
    setNewName('')
    setNewNum('')
  }

  const handleNameChange = (event) => {
    console.log('nc', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const checkDuplicates = (persons, newName) => {
    const res = persons.map((person) => person.name).find((name) => name === newName)
    if (res) {
      return true
    }
  }

  


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filtered={filtered}
        persons={persons}
        searchByName={searchByName} 
      />
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNum={newNum}
        handleNumChange={handleNumChange}
      />

      <h2>Numbers</h2>
      <Persons 
        data={persons} 
        searchName={filtered}
      />
    </div>
  )

}

export default App