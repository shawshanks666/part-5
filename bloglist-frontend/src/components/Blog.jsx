import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, tog }) => {
  const [visibile,setVisible] = useState(false)
  const [updatedblog,setUpdatedblog] = useState(blog)

  const toggleLike = async() => {
    const newBlog= { ...updatedblog, likes:updatedblog.likes+1 }
    const response = await blogService.update(newBlog.id ,newBlog)
    setUpdatedblog(response)
  }

  const toggleDelete = async() => {
    if (window.confirm('Do you really want to delete this blog?')) {
      await blogService.remove(updatedblog.id)
      setUpdatedblog(null)
    }



  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggle= { display:visibile?'':'none' }

  if (!updatedblog){
    return(null)
  } //to remove deleted blog
  return(
    <div style={blogStyle} className='blog'>
      {updatedblog.title} {updatedblog.author}
      <button className='toggleDetails' onClick={() => setVisible(!visibile)}>show more</button>
      <div style={toggle} className='urlLikes' >
        {updatedblog.url} {updatedblog.likes}
        <button className='likeButton' onClick={()=>tog(toggleLike())}>like</button>
        {updatedblog.user.name}
        {user===updatedblog.user.username && <button onClick={toggleDelete}>delete</button>}
      </div>
    </div>)
}

export default Blog