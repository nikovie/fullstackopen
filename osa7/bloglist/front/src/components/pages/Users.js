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
      <UserList users={users} />
    </div>
  )
}

export default Users
