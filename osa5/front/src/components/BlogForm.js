import React, {useState} from 'react'

const BlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    addNewBlog({
      title: title, 
      author: author,
      url: url
    })
    
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Add new</h2>
        <form onSubmit={addBlog}>
          <div>
            Title: 
            <input
              type="text"
              value={title}
              name="title"
              onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div>
            Author: 
            <input
              type="text"
              value={author}
              name="author"
              onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div>
            Url: 
            <input
              type="text"
              value={url}
              name="url"
              onChange={({target}) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Add blog</button>
        </form>
    </div>
  )
}

export default BlogForm
