import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initUsers } from '../../reducers/userDataReducer'
import {
  UserList
} from '../../components'

const Users = ({ title }) => {
  const dispatch = useDispatch()

  const users = useSelector(state => state.userdata)

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])
  
  useEffect(() => {
    title('Users')
  }, [title])

  return (
    <div>
      {!users.length ? 'Loading...' : <UserList users={users} />}
    </div>
  )
}

export default Users
