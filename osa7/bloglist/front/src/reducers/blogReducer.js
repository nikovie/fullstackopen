import blogService from '../services/blogs'
import { notifyWith } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS': 
      return action.data
    case 'CREATE_BLOG': 
      return [...state, action.data]
    case 'LIKE_BLOG':
      let id = action.data.id
      const blogToLike = state.find(blog => blog.id === id)
      const likedBlog = {...blogToLike, likes: blogToLike.likes + 1}
      return state.map(blog => blog.id !== id ? blog : likedBlog)
    case 'REMOVE_BLOG': 
      const deletedBlog = state.find(blog => blog.id === action.id)
      return state.filter(blog => blog !== deletedBlog)
    default: 
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
    dispatch(notifyWith(`A new blog "${newBlog.title}" has been added`))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const blogToLike = await blogService.update(blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: blogToLike
    })
    dispatch(notifyWith(`Added +1 to "${blogToLike.title}"`))
  }
}

export const removeBlog = (title, id) => {
  return async dispatch => {    
    if (window.confirm(`Are you sure to delete "${title}"`)) {
      dispatch({
        type: 'REMOVE_BLOG',
        id
      })
      await blogService.remove(id)
      dispatch(notifyWith('Blog removed'))
    }
  }
}

export default blogReducer
