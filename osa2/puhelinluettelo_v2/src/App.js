import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/AddPerson'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filtered, searchName ] = useState('')
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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

    async function setPersons() {
      await axios
        .post('http://localhost:3001/persons', { 
          "name": newName, 
          "number": newNum 
        }
      )
    }
    setPersons().then(window.location.reload())
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