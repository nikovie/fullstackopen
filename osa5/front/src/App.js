import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notication'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='success') => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      notifyWith(`Oops, ${exception.response.data.error}`, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    notifyWith('Logged out successfully')
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(response => {
        setBlogs(blogs.concat(response))
        notifyWith(`A new blog ${response.title} has been added`)
        blogFormRef.current.toggleVisibility()
      })
      .catch(exception => {
        notifyWith(`Oops, ${exception.response.data.error}`, 'error')
      })    
  }

  const likeBlog = (blogObject) => {
    const updateBlog = {
      user: blogObject.user.id,
      likes: blogObject.likes,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url
    }
    
    blogService
      .update(blogObject.id, updateBlog)
      .then(response => {
        notifyWith(`Added +1 to ${response.title}`)
      })
      .catch(exception => {
        notifyWith(`Oops, ${exception.response.data.error}`, 'error')
      })    
  }

  const removeBlog = (title, id) => {
    if (window.confirm(`Are you sure to delete ${title}`)) {
      blogService
        .remove(id)
        .then(notifyWith(`Blog removed`))
        .catch(exception => {
          console.log('err', exception.response.data.error)
          notifyWith(`Oops, ${exception.response.data.error}`, 'error')
        })
    }
    
  }

  const loginForm = () => (
    <>
    <form onSubmit={handleLogin}>
      <div>
        Username: 
        <input 
          type="text"
          value={username}
          name="username"
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        Password: 
        <input 
          type="password"
          value={password}
          name="password"
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
    </>
  )
  
  const blogList = () => (
    <div className="mt2">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />
        )
      }
    </div>
  )

  const blogForm = () => (
    <Togglable showLabel="Add new blog" ref={blogFormRef}>
      <BlogForm addNewBlog={addBlog}/>
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
            <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
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
