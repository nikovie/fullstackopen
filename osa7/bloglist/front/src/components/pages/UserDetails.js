import React from 'react'
import { Link } from 'react-router-dom'

const userBlogs = (blogs) => {
  if (!blogs.length) {
    return 'Nothing here...'
  }

  return (
    <ul>
      {blogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)}
    </ul>
  )
}

const UserDetails = ({ user, blogs }) => {
  return (
    <div>
      {!user 
        ? 'Loading...' 
        : <>
          <h2>{`Added by ${user.username}`}</h2>
          {userBlogs(blogs.filter(blog => blog.user.id === user.id))}
        </>
      }
          
      
    </div>
  )
}

export default UserDetails
