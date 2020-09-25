import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogs from '../services/blogs'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [details, showDetails] = useState(false)

  const showMore = () => {
    showDetails(!details)
  }

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
      {details ? (
        <>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes === null ? 0 : `${blog.likes}`}
            <button onClick={handleLike}>Like</button>
          </div>
          {blog.user && blog.user.username === user.username && <button className="fr" onClick={handleRemove}>Remove</button>}
          <button onClick={() => showMore()}>hide</button>
        </>
      ) : (
        <button onClick={() => showMore()}>view</button>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func,
  removeBlog: PropTypes.func,
  user: PropTypes.object.isRequired
}

export default Blog
