import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../../hooks'

const Input = ({reset, ...rest}) => {
  return (
    <input {...rest} />
  )
}

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
  }

  const resetForm = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <Input {...content} />
        </div>
        <div>
          author
          <Input {...author} />
        </div>
        <div>
          url for more info
          <Input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={resetForm}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
