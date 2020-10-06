import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  return (
    <div className="mb2 ph1 pv2 b--solid b--gray">
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>
      </div>
      
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
