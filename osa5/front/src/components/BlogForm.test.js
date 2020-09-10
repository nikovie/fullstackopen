import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('when the blog is created callback function is called with the correct data', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm addNewBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'Sample title' }
    })
    fireEvent.change(author, {
      target: { value: 'Bob the Bot' }
    })
    fireEvent.change(url, {
      target: { value: 'www.fi' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Sample title')
    expect(createBlog.mock.calls[0][0].author).toBe('Bob the Bot')
    expect(createBlog.mock.calls[0][0].url).toBe('www.fi')
  })
})
