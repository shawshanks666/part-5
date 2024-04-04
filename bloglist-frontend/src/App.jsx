import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import CreateBlog from './components/createBlog'
import Togglable from './components/Togglable'
import { func } from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)
    }
  }, [])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

 
  const postBlog =  async(blogObject) => {    
    const returnedBlog = await blogService.create(blogObject,user.token)
    console.log(returnedBlog);
    setBlogs(blogs.concat(returnedBlog))
  }

  const test =(func) => {
    func()
  }

  const noteForm = () => {

    const sortedBlogs= blogs.sort((a,b) => b.likes-a.likes)

    return(
      <div>
        {
          sortedBlogs.map(blog =>
            <Blog user={user.username} blog={blog} key={blog.id} tog={test} />)
        }
        <button onClick={ () => {
          window.localStorage.clear()
          window.location.reload()
        }}>
        logout</button>
        <Togglable buttonLabel="create blog">
          <CreateBlog user={user} postBlog={postBlog} />

        </Togglable>
      </div>
    )
  }

  const loginForm = () => {

    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => {setUsername(target.value)
              console.log(username)}}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
            errorMessage={errorMessage}
          />
      </Togglable>
        
      </div>
    )
  }

  return (
    <div>
      {user===null && loginForm()}
      {user !== null && noteForm()}
    </div>
  )
}

export default App