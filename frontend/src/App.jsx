import { useState } from 'react'
import Signup from './Signup'
import Products from './Products'
import './App.css'

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '')
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '')

  function handleLogin(accessToken, signedInUsername) {
    sessionStorage.setItem('token', accessToken)
    sessionStorage.setItem('username', signedInUsername)
    setToken(accessToken)
    setUsername(signedInUsername)
  }

  function handleLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    setToken('')
    setUsername('')
  }

  return (
    <main>
      <h1>Simple Store</h1>
      {token ? (
        <Products token={token} username={username} onLogout={handleLogout} />
      ) : (
        <Signup onLogin={handleLogin} />
      )}
    </main>
  )
}

export default App
