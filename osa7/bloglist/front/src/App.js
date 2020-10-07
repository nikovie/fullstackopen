import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initUsers } from './reducers/userDataReducer'
import { initBlogs } from './reducers/blogReducer'
import { likeBlog, removeBlog } from './reducers/blogReducer'
import { userLoggedIn } from './reducers/userReducer'
import {
  Header,
  Notification
} from './components'
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import Users from './components/pages/Users'
import UserDetails from './components/pages/UserDetails'
import BlogDetails from './components/pages/BlogDetails'
import {
  Switch, Route,
  useRouteMatch
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const message = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const userdata = useSelector(state => state.userdata)

  useEffect(() => {
    dispatch(userLoggedIn())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(initBlogs())
      dispatch(initUsers())
    }
  }, [dispatch, user])

  const userMatch = useRouteMatch('/users/:id')
  const matchUser = userMatch
    ? userdata.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const matchBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <div className="container">
      <Header user={user} />
      <Notification notification={message}/>
      <div className="ma2">
        {user === null ?
          <Switch>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
          :
          <Switch>
            <Route path="/blogs/:id">
              <BlogDetails 
                blog={matchBlog}
                likeBlog={(blog) => dispatch(likeBlog(blog))}
                removeBlog={(blog) => dispatch(removeBlog(blog.title, blog.id))}
                user={user}
              />
            </Route>
            <Route path="/users/:id">
              <UserDetails user={matchUser} blogs={blogs} />
            </Route>
            <Route path="/users">
              <Users users={userdata} blogs={blogs} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        }
      </div>
    </div>
  )
}

export default App
