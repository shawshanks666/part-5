import { useState } from 'react'




const CreateBlog = ({ user,postBlog }) => {



  const [title,setTitle] = useState('')
  const [url,setUrl] = useState('')
  const [author,setAuthor] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject= {
      url: url,
      user:user.id,
      author: author,
      title:title,
      likes: 0
    }
    postBlog(blogObject)
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return(
    <form onSubmit={addBlog}>
      <h2>Create new blo</h2>
      <div>
        title
        <input
          className='input1'
          placeholder='enter title...'
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          className='input2'
          placeholder='enter author...'
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          className='input3'
          placeholder='enter url...'
          type={'url'}
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button className='post' type="submit">post</button>
    </form>)
}
export default CreateBlog