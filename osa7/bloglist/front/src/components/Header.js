import React from 'react'
import { useDispatch } from 'react-redux'
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
    </div>
  )
}

export default Header
