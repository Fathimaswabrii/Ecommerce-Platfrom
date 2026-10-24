import { useState } from 'react'
import { request } from './api'

function Signup({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [auth, setAuth] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const signup = mode === 'signup'

  async function submit(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    try {
      const data = await request(signup ? '/signup/' : '/token/', {
        method: 'POST',
        body: JSON.stringify(auth),
      })
      if (signup) {
        setMode('login')
        setAuth({ ...auth, password: '' })
        setMessage('Account created. Please log in.')
      } else {
        onLogin(data.access, auth.username)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  function toggleMode() {
    setMode(signup ? 'login' : 'signup')
    setError('')
    setMessage('')
  }

  return (
    <section>
      <h2>{signup ? 'Sign up' : 'Log in'}</h2>
      {error && <p className="error">{error}</p>}
      {message && <p>{message}</p>}
      <form onSubmit={submit}>
        <input required placeholder="Username" value={auth.username}
          onChange={(e) => setAuth({ ...auth, username: e.target.value })} />
        <input required type="password" placeholder="Password" value={auth.password}
          onChange={(e) => setAuth({ ...auth, password: e.target.value })} />
        <button>{signup ? 'Create account' : 'Log in'}</button>
      </form>
      <button className="link" onClick={toggleMode}>
        {signup ? 'Already registered? Log in' : 'Need an account? Sign up'}
      </button>
    </section>
  )
}

export default Signup
