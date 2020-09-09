import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author by default but not other info', () => {
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

  const component = render(
    <Blog blog={blog} user={user} />
  )

  // component.debug()

  expect(component.container).toHaveTextContent('Sample title')
  expect(component.container).toHaveTextContent('Bob the Bot')
  expect(component.container).not.toHaveTextContent('www.fi')
  expect(component.container).not.toHaveTextContent('100')
})

test('all details are shown when view button is clicked', () => {
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

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  // component.debug()

  expect(component.container).toHaveTextContent('Sample title')
  expect(component.container).toHaveTextContent('Bob the Bot')
  expect(component.container).toHaveTextContent('www.fi')
  expect(component.container).toHaveTextContent('Likes: 100')
})