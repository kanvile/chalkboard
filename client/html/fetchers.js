const fetcher = async (url, init = {}) => {
  const token = localStorage.getItem('token')

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : undefined,
  }

  const defaultInit = {
    headers: defaultHeaders,
    mode: 'same-origin',
  }

  const res = await fetch(url, {
    ...defaultInit,
    ...init,
    headers: { ...defaultHeaders, ...(init.headers || {}) },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  })

  const data = await res.json()

  if (res.ok) {
    return data
  } else {
    alert(data)
    throw new Error(data)
  }
}

const login = async (data) => {
  const { token, user } = await auth(data, 'login')

  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)

  return user
}

const register = async (data) => {
  const user = await auth(data, 'register')

  return user
}

const auth = async (data, url) => {
  const res = await fetcher(`/${url}`, {
    body: data,
    method: 'POST',
  })

  return res
}

export { login, register, fetcher }
