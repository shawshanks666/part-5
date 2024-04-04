import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject,token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }


  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  console.log(request.data)
  return request.data

}

const remove = async (id) => {
  const request= await axios.delete(`${baseUrl}/${id}`)
  console.log(request)
}

export default { getAll, create, update, setToken,remove }
