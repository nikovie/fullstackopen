const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

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
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'Bad request'
    })
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()

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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blogToDelete = await Blog.findById(request.params.id)
    const blogAuthor = blogToDelete.user.toString()

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    if (blogAuthor !== decodedToken.id) {
      response.status(401).json({ error: 'that is not yours, cannot delete' })
    }
    else {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }    
  } 
  catch(error) {
    next(error)
  }
})

module.exports = blogRouter