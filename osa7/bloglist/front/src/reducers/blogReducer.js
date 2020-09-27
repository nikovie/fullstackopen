import blogService from '../services/blogs'
import { notifyWith } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS': 
      return action.data
    case 'CREATE_BLOG': 
      return [...state, action.data]
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

export default blogReducer
