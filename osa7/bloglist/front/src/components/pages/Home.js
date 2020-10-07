import React, { useRef } from 'react'
import {
  Blog, 
  BlogForm,
  Togglable
} from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'

const Home = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()
  
  const blogList = () => (
    <div id="blogList" className="mt2">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )
      }
    </div>
  )
  
  const blogForm = () => (
    <Togglable showLabel="Add new blog" ref={blogFormRef}>
      <BlogForm 
        addNewBlog={(obj) => {
          dispatch(createBlog(obj))
          blogFormRef.current.toggleVisibility()
        }}
      />
    </Togglable>
  )

  return (
    <div className="ma2">
      {blogForm()}
      {blogList()}
    </div>
  )
}

export default Home
