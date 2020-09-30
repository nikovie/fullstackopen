import React, { useEffect } from 'react'

const userBlogs = (blogs) => {
  if (!blogs) {
    return 'Nothing here...'
  }

  return (
    <ul>
      {blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
    </ul>
  )
}

const User = ({ user, title }) => {
  useEffect(() => {
    title('Blogs')
  }, [title])

  return (
    <div>
      {!user 
        ? 'Loading...' 
        : <>
          <h2>{`Added by ${user.username}`}</h2>
          {userBlogs(user.blogs)}
        </>
      }
          
      
    </div>
  )
}

export default User
