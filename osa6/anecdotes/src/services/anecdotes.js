import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl) 
  return response.data
} 

const create = async (content, votes = 0) => {
  const object = { content, votes }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const plusOne = anecdote.data.votes+1
  const response = await axios.patch(`${baseUrl}/${id}`, {votes: plusOne})
  return response.data
}

export default { getAll, create, addVote }
