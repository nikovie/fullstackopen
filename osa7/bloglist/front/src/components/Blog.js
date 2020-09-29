import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [details, showDetails] = useState(false)

  const showMore = () => {
    showDetails(!details)
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
            <button
              onClick={() =>
                likeBlog({
                  ...blog, 
                  likes: blog.likes === null ? 0 : blog.likes + 1,
                  user: blog.user.id
                })
              }>Like</button>
          </div>
          {blog.user &&
            blog.user.username === user.username &&
            <button
              className="fr"
              onClick={() => removeBlog(blog)}
            >Remove</button>
          }
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
