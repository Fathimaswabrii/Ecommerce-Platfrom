const API = 'http://127.0.0.1:8000/api'

export async function request(path, options = {}) {
  const { token, ...fetchOptions } = options
  const response = await fetch(`${API}${path}`, {
    ...fetchOptions,
    headers: {
      ...(fetchOptions.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...fetchOptions.headers,
    },
  })

  if (response.status === 204) return null

  const text = await response.text()
  let data
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }

  if (!response.ok) {
    throw new Error(data?.detail || JSON.stringify(data) || `Request failed (${response.status})`)
  }

  return data
}
