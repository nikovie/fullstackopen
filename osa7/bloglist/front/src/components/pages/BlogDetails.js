import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addComment } from '../../reducers/blogReducer'
import { Badge, Button, Form, ListGroup } from 'react-bootstrap'

const BlogDetails = ({blog, likeBlog, removeBlog}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const comments = blog && blog.comments ? blog.comments : null

  const addNewComment = (event) => {
    event.preventDefault()
    const comment = { comment: event.target.commentField.value }
    event.target.commentField.value = null
    dispatch(addComment(comment, blog.id))
  }
  return (
    <div>
      {!blog 
        ? null 
        : <>
          <h2>{blog.title} by {blog.author}</h2>
          <div className="ml3">
            <div>
              <div className="dib f4">
                <Badge pill variant="info">URL</Badge>
                <span className="ml2">{blog.url}</span>
              </div>
              {blog.user &&
                blog.user.username === user.username &&
                <div className="dib fr">
                  <Button
                    className="fr"
                    onClick={() => removeBlog(blog)}
                    variant="danger"
                    size="sm"
                  >Remove</Button>
                </div>
              }
            </div>
            <div className="f4">
              <span className="mr2">Likes:</span>
              <Badge pill variant="info">{blog.likes === null ? 0 : `${blog.likes}`}</Badge>
              <Button
                onClick={() =>
                  likeBlog({
                    ...blog, 
                    likes: blog.likes === null ? 0 : blog.likes + 1,
                    user: blog.user.id
                  })
                }
                variant="info"
                size="sm"
                className="ml2"
              >
                Like
              </Button>
            </div>
            <div className="mt1 mb2">
              <span className="i f6">added by {blog.user.name ? blog.user.name : blog.user.username}</span>
            </div>
          </div>
          
          <div>
            <h3>Comments</h3>
            <Form onSubmit={addNewComment} inline>
              <Form.Control type="text" name="commentField" />
              <Button type="submit">Add comment</Button>
            </Form>
            {!comments
              ? null
              : <ListGroup className="mt4">
                {comments
                  .map(comment =>
                    <ListGroup.Item key={comment.id}>{comment.comment}</ListGroup.Item>
                  )
                }
              </ListGroup>
            }
          </div>
          
        </>
      }
    </div>
  )
}

export default BlogDetails
