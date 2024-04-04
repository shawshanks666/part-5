import PropTypes from 'prop-types'
const LoginForm = ({ username,password,handleUsernameChange,handlePasswordChange,handleSubmit,errorMessage }) => {
  return(
    <form onSubmit={handleSubmit}>
      <div>{errorMessage}</div>

      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired

}

export default LoginForm