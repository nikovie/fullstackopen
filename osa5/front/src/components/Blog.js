import React, {useState} from 'react'
import Togglable from './Togglable'
import blogs from '../services/blogs'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const handleLike = () => {
    blogs.likes === null ? blog.likes=0 : blog.likes++
    likeBlog(blog)
  }

  const handleRemove = () => {
    removeBlog(blog.title, blog.id)
  }

  return (
    <div className="mb2 ph1 pv2 b--solid b--gray">
      <div>
        {blog.title}
        <i> by {blog.author}</i> 
      </div>
      <Togglable showLabel="view">
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes === null ? 0 : `${blog.likes}`}
          <button onClick={handleLike}>Like</button>
        </div>
        {blog.user.username === user.username && <button className="fr" onClick={handleRemove}>Remove</button>}
      </Togglable>
    </div>
  )
}

export default Blog
