const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const helper = require('../utils/test_helper')

describe('when there is initially one user at the db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('nananana', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('create new user', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: "nikovie",
      name: "Niko",
      password: "nanana"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length + 1)

    const usernames = usersAfter.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('username must be unique', async () => {
    const user = { username: 'root', password: 'nanana' }
    const usersBefore = await helper.usersInDb()

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body.error).toContain('User validation failed: username: Error, expected `username` to be unique.')
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length)
  })

  test('username cannot be empty or shorter than 3 characters', async () => {
    const usersBefore = await helper.usersInDb()
    const empty1 = { username: '', password: 'nanana' }
    const empty2 = { username: 'roo', password: '' }
    const short1 = { username: 'ro', password: 'nanana' }
    const short2 = { username: 'roo', password: 'na' }

    const test1 = await api
      .post('/api/users')
      .send(empty1)
      .expect(400)
    const test2 = await api
      .post('/api/users')
      .send(empty2)
      .expect(400)
    const test3 = await api
      .post('/api/users')
      .send(short1)
      .expect(400)
    const test4 = await api
      .post('/api/users')
      .send(short2)
      .expect(400)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})