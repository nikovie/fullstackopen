const dummy = (blogs) => {
  return Array(blogs) && 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  const uniqAuthors = new Set(blogs.map(blog => blog.author))
  let blogsByAuthors = []
  uniqAuthors.forEach(author => {
    const authorBlogs = blogs.filter(blog => blog.author === author)
    blogsByAuthors.push({author, 'blogs': authorBlogs.length})
  })
  return blogsByAuthors.length === 0
    ? null
    : blogsByAuthors.reduce((prev, now) => (prev.blogs > now.blogs) ? prev : now )
}

const mostLikes = (blogs) => {
  const uniqAuthors = new Set(blogs.map(blog => blog.author))
  let blogsByAuthors = []
  uniqAuthors.forEach(author => {
    const authorBlogs = blogs.filter(blog => blog.author === author)
    const authorLikes = authorBlogs.reduce((sum, blog) => sum + blog.likes, 0)
    blogsByAuthors.push({author, 'likes': authorLikes})
  })

  return blogsByAuthors.length === 0
    ? null
    : blogsByAuthors.reduce((prev, now) => (prev.likes > now.likes) ? prev : now)
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs, 
  mostLikes
}