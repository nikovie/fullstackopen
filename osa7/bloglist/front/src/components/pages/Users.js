import React, { useEffect } from 'react'
import {
  UserList
} from '../../components'

const Users = ({ title, users }) => {
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
