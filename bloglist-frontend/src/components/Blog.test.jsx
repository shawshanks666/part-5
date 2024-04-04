import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// eslint-disable-next-line no-undef
test('renders content', () => {
  const blog = {
    title: 'dune',
    author: 'abc',
    url: 'xz',
    likes: 105,
    user: {
      username: 'shank',
      name: 'shashank',
      id: '6603f755872356fdb65386f1'
    },
    id: '66072f68aafa1eb298d4a84e'
  }
  const user= 'shank'

  render(<Blog blog={blog} user={user} />)
  const div = screen.getByText('dune abc')
  expect(div).toHaveTextContent(
    'dune abc'
  )
  screen.debug(div)
})

test('display url&likes', async() => {
  const blog = {
    title: 'dune',
    author: 'abc',
    url: 'xz',
    likes: 105,
    user: {
      username: 'shank',
      name: 'shashank',
      id: '6603f755872356fdb65386f1'
    },
    id: '66072f68aafa1eb298d4a84e'
  }
  const user= 'shank'
  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} user={user} onClick={mockHandler} />)
  const User = userEvent.setup()
  const button = container.querySelector('.toggleDetails')
  await User.click(button)
  const div = container.querySelector('.urlLikes')
  screen.debug(div)
})

test('click like twice', async() => {
  const blog = {
    title: 'dune',
    author: 'abc',
    url: 'xz',
    likes: 105,
    user: {
      username: 'shank',
      name: 'shashank',
      id: '6603f755872356fdb65386f1'
    },
    id: '66072f68aafa1eb298d4a84e'
  }
  const user= 'shank'
  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} user={user} tog={mockHandler} />)
  const User = userEvent.setup()
  const button = container.querySelector('.toggleDetails')
  await User.click(button)
  const likeButton = container.querySelector('.likeButton')
  await User.click(likeButton)
  await User.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})




// test('clicking the button calls event handler once', async() => {
//   const blog = {
//     title: 'dune',
//     author: 'abc',
//     url: 'xz',
//     likes: 105,
//     user: {
//       username: 'shank',
//       name: 'shashank',
//       id: '6603f755872356fdb65386f1'
//     },
//     id: '66072f68aafa1eb298d4a84e'
//   }
//   const user = 'shank'
//   const mockHandler = vi.fn()



//   render(
//     <Blog blog={blog} user={user} showMore={mockHandler}/>
//   )

//   const User = userEvent.setup()
//   const button = screen.getByText('make not important')
//   await User.click(button)

//   expect(mockHandler.mock.calls).toHaveLength(1)
// })