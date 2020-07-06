const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.password) {
    return response.status(400).json({ error: 'password cannot be empty' })
  }
  else if (body.password.length < 3) {
    return response.status(400).json({ error: 'password cannot be shorter than 3 characters' })
  }

  try {
    const passwordHash = await bcrypt.hash(body.password, 10)
  
    const user = new User({
      username: body.username,
      name: body.name, 
      passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
  }
  catch(error) {
    next(error)
  }
})

module.exports = userRouter
