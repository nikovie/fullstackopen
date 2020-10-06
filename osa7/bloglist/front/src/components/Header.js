import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../reducers/userReducer'

const Header = ({ title, user }) => {
  const dispatch = useDispatch()
  return (
    <div className="bg-gray ph2">
      <div className="dib">
        <h1>{title}</h1>
      </div>
      <div className="dib fr">
        {user !== null &&
          <p>{user.name} logged in <button onClick={() => dispatch(userLogout())}>logout</button></p>
        }
      </div>
      <div className="menu">
      <nav>
        <Link to="/" className="menuItem">Blogs</Link>
        <Link to="/users" className="menuItem">Users</Link>
      </nav>
      </div>
    </div>
  )
}

export default Header
