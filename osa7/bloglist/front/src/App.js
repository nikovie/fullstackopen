import React, { useState, useEffect, useRef } from 'react'
import {
  Blog, 
  BlogForm,
  Notification,
  Togglable
} from './components'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin, userLoggedIn, userLogout } from './reducers/userReducer'
import { initBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const message = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    if (user) {
      dispatch(initBlogs())
    }
  }, [dispatch, user])

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
            likeBlog={(blog) => dispatch(likeBlog(blog))}
            removeBlog={(blog) => dispatch(removeBlog(blog.title, blog.id))}
            user={user}
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
    <div>
      <div className="bg-gray ph2">
        <div className="dib">
          <h1>Blogs</h1>
        </div>
        <div className="dib fr">
          {user !== null &&
            <p>{user.name} logged in <button onClick={() => dispatch(userLogout())}>logout</button></p>
          }
        </div>
      </div>

      <Notification notification={message}/>

      <div className="ma2">
        {user === null ?
          loginForm() :
          <div>
            {blogForm()}
            {blogList()}
          </div>
        }
      </div>
    </div>
  )
}

export default App
