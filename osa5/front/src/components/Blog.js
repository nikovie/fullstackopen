import React, {useState} from 'react'
import Togglable from './Togglable'
import blogs from '../services/blogs'

const Blog = ({ blog, likeBlog }) => {
  const handleLike = () => {
    blogs.likes === null ? blog.likes=0 : blog.likes++
    likeBlog(blog)
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
          <button onClick={() => handleLike()}>Like</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
