import React from 'react'
import { Link } from 'react-router-dom'

const UserBlogs = ({username, blogs, id}) => {
  return (
    <tr>
      <td><Link to={`/users/${id}`}>{username}</Link></td>
      <td>{blogs}</td>
    </tr>
  )
}

const UserList = ({users}) => {
  return (
    <table>
      <thead> 
      </thead>
      <tbody>
        <tr><th /><th>blogs created</th></tr>
        {users
          .map(user =>
            <UserBlogs
              key={user.id}
              id={user.id}
              username={user.name ? user.name : user.username}
              blogs={user.blogs.length}
            />
          )
        }
      </tbody>
    </table>
  )
}

export default UserList
