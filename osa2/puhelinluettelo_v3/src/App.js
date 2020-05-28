import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/AddPerson'
import Persons from './components/Persons'

const Message = ({message, type}) => {
  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filtered, searchName ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ msgType, setMsgType ] = useState(null)
  
  const resetNew = () => {
    setNewName('')
    setNewNum('')
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch((error) => {
        console.log(error)
        setMessage(
          'Oops! Something went wrong...'
        )
        setMsgType('error')
        setTimeout(() => {
          setMessage(null)
          setMsgType(null)
        }, 5000)
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

    const existing = persons.filter(person => person.name === newName)
    if (existing.length === 1) {
      if (window.confirm(`${newName} is already added to phonebook, update a number?`)) {
        console.log('existing', existing)
        const num = { ...existing[0], number: newNum }
        updateNumber(existing[0].id, num)
      }
      resetNew()
      return
    }

    personService
      .create({"name": newName, "number": newNum})
      .then(response => {
        setPersons(persons.concat(response.data))
        resetNew()
        setMessage(
          `New contact '${newName}' added.`
        )
        setMsgType('success')
        setTimeout(() => {
          setMessage(null)
          setMsgType(null)
        }, 5000)
      })
      .catch((error) => {
        console.log(error)
        setMessage(
          'Oops! Something went wrong...'
        )
        setMsgType('error')
        setTimeout(() => {
          setMessage(null)
          setMsgType(null)
        }, 5000)
      })
  }
  

  const handleNameChange = (event) => {
    console.log('nc', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const updateNumber = (id, num) => {
    personService
      .update(id, num)
      .then(response => {
        console.log('user updated', response.data)
        setMessage(
          `Contact updated.`
        )
        setMsgType('success')
        setTimeout(() => {
          setMessage(null)
          setMsgType(null)
        }, 5000)
        setPersons(persons.map(person => person.id === id ? response.data : person))
      })
      .catch((error) => {
        console.log(error)
        setMessage(
          'Oops! Something went wrong...'
        )
        setMsgType('error')
        setTimeout(() => {
          setMessage(null)
          setMsgType(null)
        }, 5000)
      })
  }

  const removeContact = (id) => {
    personService
      .remove(id)
      .then(response => {
        const name = persons.filter(person => person.id === id).map(x => x.name)
        console.log('x', name)
        setMessage(
          `'${name}' was removed from contacts.`
        )
        setMsgType('success')

        setTimeout(() => {
          setMessage(null)
          setMsgType(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
        
      })
      .catch((error) => {
        console.log(error)
        if(error.response.status === 404) {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(
            'Contact has already been removed'
          )
          setMsgType('success')
          setTimeout(() => {
            setMessage(null)
            setMsgType(null)
          }, 5000)
          return
        }
        setMessage(
          'Oops! Something went wrong...'
        )
        setMsgType('error')
        setTimeout(() => {
          setMessage(null)
          setMsgType(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} type={msgType} />
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
        removeContact={removeContact}
      />
    </div>
  )

}

export default App