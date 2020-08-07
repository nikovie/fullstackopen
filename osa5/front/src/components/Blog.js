import React, {useState} from 'react'
import Togglable from './Togglable'

const Blog = ({ blog }) => {
  const [details, showDetails] = useState('')

  const min = (id) => {
    const details = `nanan ${id}`
    return (
      <p>{details}</p>
    )
  }

  return (
    <div className="mb2 ph1 pv2 b--solid b--gray">
      <div>
        {blog.title}
        <i> by {blog.author}</i> 
      </div>
      <Togglable showLabel="view">
        <div>{blog.url}</div>
        <div>Likes: {blog.likes}</div>
      </Togglable>
    </div>
  )
}

export default Blog
