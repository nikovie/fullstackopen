import React, { useState, useEffect, useRef } from 'react'
import {
  Blog, 
  BlogForm,
  Togglable
} from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin, userLoggedIn } from '../../reducers/userReducer'
import { createBlog } from '../../reducers/blogReducer'

const Home = ({title}) => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    title('Blogs')
  }, [title])

  useEffect(() => {
    dispatch(userLoggedIn())
  }, [dispatch])

  const loginForm = () => (
    <>
      <form
        id="loginForm"
        onSubmit={
          (event) => {
            event.preventDefault()
            dispatch(userLogin(username, password))
            setUsername('')
            setPassword('')
          }
        }>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
  
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
      {user === null ?
        loginForm() :
        <div>
          {blogForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

export default Home
