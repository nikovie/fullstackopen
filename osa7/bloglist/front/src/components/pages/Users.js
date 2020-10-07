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

const Users = ({ users, blogs }) => {
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
              blogs={blogs.filter(blog => blog.user.id === user.id).length}
            />
          )
        }
      </tbody>
    </table>
  )
}

export default Users
