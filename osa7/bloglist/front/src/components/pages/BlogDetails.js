import React from 'react'
import { useSelector } from 'react-redux'

const BlogDetails = ({blog, likeBlog, removeBlog}) => {
  const user = useSelector(state => state.user)
  const comments = blog && blog.comments ? blog.comments : null
  return (
    <div>
      {!blog 
        ? null 
        : <>
          <h2>{blog.title} by {blog.author}</h2>
          <div>
            <div className="dib">{blog.url}</div>
            {blog.user &&
              blog.user.username === user.username &&
              <div className="dib fr">
                <button
                  className="fr"
                  onClick={() => removeBlog(blog)}
                >Remove</button>
              </div>
            }
          </div>
          <div>
            Likes: {blog.likes === null ? 0 : `${blog.likes}`}
            <button
              onClick={() =>
                likeBlog({
                  ...blog, 
                  likes: blog.likes === null ? 0 : blog.likes + 1,
                  user: blog.user.id
                })
              }>Like</button>
          </div>
          <div>added by {blog.user.name ? blog.user.name : blog.user.username}</div>
          {!comments
            ? null
            : <div>
              <h3>Comments</h3>
              <ul>
                {comments
                  .map(comment =>
                    <li key={comment.id}>{comment.comment}</li>
                  )
                }
              </ul>
            </div>
          }
        </>
      }
    </div>
  )
}

export default BlogDetails
