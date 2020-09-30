import React from 'react'

const UserBlogs = ({username, blogs}) => {
  return <tr><td>{username}</td><td>{blogs}</td></tr>
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
              username={user.username}
              blogs={user.blogs.length}
            />
          )
        }
      </tbody>
    </table>
  )
}

export default UserList
