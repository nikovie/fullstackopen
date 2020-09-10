import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'Sample title',
      author: 'Bob the Bot',
      url: 'www.fi',
      likes: '100'
    }
    const user = {
      username: 'bot',
      password: 'top'
    }
    
    mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} user={user} likeBlog={mockHandler} />
    )
  })

  test('renders title and author by default but not other info', () => {
    // component.debug()
  
    expect(component.container).toHaveTextContent('Sample title')
    expect(component.container).toHaveTextContent('Bob the Bot')
    expect(component.container).not.toHaveTextContent('www.fi')
    expect(component.container).not.toHaveTextContent('100')
  })
  
  test('all details are shown when view button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
  
    // component.debug()
  
    expect(component.container).toHaveTextContent('Sample title')
    expect(component.container).toHaveTextContent('Bob the Bot')
    expect(component.container).toHaveTextContent('www.fi')
    expect(component.container).toHaveTextContent('Likes: 100')
  })
  
  test('likeBlog handler are call as many times like button is clicked', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
  
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
  
    // component.debug()
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
