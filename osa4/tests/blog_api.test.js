const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const blogsForTesting = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }
]

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('nananana', 10)
  const user = new User({ username: 'root', passwordHash })
  
  await user.save()

  await Blog.deleteMany({})

  let blogObj = new Blog(blogsForTesting[0])
  Object.assign(blogObj, { user: user._id})
  await blogObj.save()

  blogObj = new Blog(blogsForTesting[1])
  Object.assign(blogObj, { user: user._id})
  await blogObj.save()
})

describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('blogs length matches to length of blogsForTesting', async () => {
    const blogs = await Blog.find({})
    expect(blogs.length).toBe(blogsForTesting.length)
  })
  test('look for specific title', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body.map(r => r.title)
    expect(blogs).toContain(blogsForTesting[1].title)
  })
  test('make sure _id is corrected to id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(item => {
      const idAsKey = Object.keys(item).find(item => item === 'id')
      expect(idAsKey).toBeDefined()
    });
  })
})

describe('addition of new blogs', () => {
  test('new blogs can be added and the number of blogs increases', async () => {
    const passwordHash = await bcrypt.hash('allmightykey', 10)
    const user = new User({ username: 'blogger', name: 'Bob The Blogger', passwordHash})
    await user.save()

    const userForToken = {
      username: user.username,
      id: user._id
    }
  
    const accessToken = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: "Testing addition of new blog",
      author: "Blog Api Tester",
      url: "www",
      likes: 99,
      user: user._id
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newBlog)
      .expect(200)
    
    const blogs = await api.get('/api/blogs')
    expect(blogs.body.length).toBe(blogsForTesting.length + 1)
  })
  test('adding new blog w/o likes returns 0', async () => {
    const passwordHash = await bcrypt.hash('allmightykey', 10)
    const user = new User({ username: 'blogger', name: 'Bob The Blogger', passwordHash})
    await user.save()

    const userForToken = {
      username: user.username,
      id: user._id
    }
  
    const accessToken = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: "A new blog with 0 likes",
      author: "Blog Api Tester",
      url: "www",
      user: user._id
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newBlog)
      .expect(200)
    
    const blogs = await api.get('/api/blogs')
    const likes = blogs.body.map(b => b.likes)
    const newest = likes[blogsForTesting.length]
    expect(newest).toBe(0)
  })
  test('adding new blog w/o title and/or url returns 400 bad request', async () => {
    const passwordHash = await bcrypt.hash('allmightykey', 10)
    const user = new User({ username: 'blogger', name: 'Bob The Blogger', passwordHash})
    await user.save()

    const userForToken = {
      username: user.username,
      id: user._id
    }
  
    const accessToken = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      author: "Blog Api Tester"
    }

    await api
      .post('/api/blogs')
      .set('Authorizaton', `Bearer ${accessToken}`)
      .send(newBlog)
      .expect(400)
  })
  test('cannot login with wrong crendentials', async () => {
    const user = {
      username: 'foo', 
      password: 'bar'
    }

    const login = await api
      .post('/api/login')
      .send(user)
      .expect(401)
  })
})
describe('remove blogs', () => {
  test('remove blog by id', async () => {
    const blogs = await api.get('/api/blogs')

    const login = await api
      .post('/api/login')
      .send({ username: 'root', password: 'nananana'})
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const accessToken = login.body.token
    expect(accessToken).toBeDefined()

    await api
      .delete(`/api/blogs/${blogs.body[0].id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(204)

    const blogsAfter = await api.get('/api/blogs')
    expect(blogsAfter.body.length).toBe(blogsForTesting.length - 1)
  })
})
describe('update blogs', () => {
  test('update blog by id', async () => {
    let blog = await Blog.findOne({})
    
    await api
      .put(`/api/blogs/${blog.id}`)
      .send({ "likes": blog.likes + 1 })
      .expect(200)

    const blogAfter = await Blog.findById(blog.id)
    expect(blogAfter.likes).toBe(blog.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
