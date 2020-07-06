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
    const newBlog = {
      title: "Testing addition of new blog",
      author: "Blog Api Tester",
      url: "www",
      likes: 99
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
    
    const blogs = await api.get('/api/blogs')
    expect(blogs.body.length).toBe(blogsForTesting.length + 1)
  })
  test('adding new blog w/o likes returns 0', async () => {
    const newBlog = {
      title: "A new blog with 0 likes",
      author: "Blog Api Tester",
      url: "www"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
    
    const blogs = await api.get('/api/blogs')
    const likes = blogs.body.map(b => b.likes)
    const newest = likes[blogsForTesting.length]
    expect(newest).toBe(0)
  })
  test('adding new blog w/o title and/or url returns 400 bad request', async () => {
    const newBlog = {
      author: "Blog Api Tester"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})
describe('remove blogs', () => {
  test('remove blog by id', async () => {
    const blogs = await api.get('/api/blogs')
    
    await api
      .delete(`/api/blogs/${blogs.body[0].id}`)
      .expect(204)

    const blogsAfter = await api.get('/api/blogs')
    expect(blogsAfter.body.length).toBe(blogsForTesting.length - 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
