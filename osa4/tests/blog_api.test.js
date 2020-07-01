const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

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
  await Blog.deleteMany({})

  let blogObj = new Blog(blogsForTesting[0])
  await blogObj.save()

  blogObj = new Blog(blogsForTesting[1])
  await blogObj.save()
})

describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('look for specific title', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body.map(r => r.title)
    expect(blogs).toContain(blogsForTesting[1].title)
  })
  
})

afterAll(() => {
  mongoose.connection.close()
})
