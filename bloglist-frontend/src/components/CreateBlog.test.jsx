import { render, screen } from '@testing-library/react'
import CreateBlog from './createBlog'
import userEvent from '@testing-library/user-event'

test('<CreateBlog /> updates parent state and calls onSubmit', async () => {
  const postBlog = vi.fn()
  const user = userEvent.setup()
  const User = {id:12}
  const {container} =render(<CreateBlog user={User} postBlog={postBlog} />)

  const inputs = screen.getAllByRole('textbox')
  console.log(inputs);
  const titleInput = container.querySelector('.input1') 
  const authorInput = container.querySelector('.input2') 
  const urlInput = container.querySelector('.input3') 
  const sendButton = container.querySelector('.post')
  userEvent.type(authorInput, 'author')
  userEvent.type(urlInput, 'url')

  await user.click(sendButton)

  console.log(postBlog.mock.calls);
  expect(postBlog.mock.calls).toHaveLength(1)
  expect(postBlog.mock.calls[0][0].content).toBe('title')
})