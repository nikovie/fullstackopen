const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
  }
  catch(error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    return response.status(400).json({
      error: 'Bad request'
    })
  }

  try {
    const savedBlog = await blog.save()
    response.json(savedBlog)
  }
  catch(error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  if (body.title || body.url || body.author) {
    return response.status(400).json({
      error: 'Bad request'
    })
  }
  const blog = {
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  }
  catch(error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } 
  catch(error) {
    next(error)
  }
})

module.exports = blogRouter