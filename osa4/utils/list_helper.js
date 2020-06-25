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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}