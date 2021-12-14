export const fetcher = async (url, init = {}) => {
  console.log(url, init)

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

export const login = async (data) => {
  const { token, user } = await auth(data, 'login')

  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)

  return user
}

export const register = async (data) => {
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

export const createCourse = async (data) => {
  const res = await fetcher('/courses', {
    body: data,
    method: 'POST',
  })

  return res
}

export const getCourses = async () => {
  const res = await fetcher('/courses', {
    method: 'GET',
  })

  return res
}

export const getCourseById = async (id) => {
  const res = await fetcher(`/courses/${id}`, { method: 'GET' })
  return res
}

export const getCourseByName = async (name) => {
  const res = await fetcher(`/courses?name=${name}`, {
    method: 'GET',
  })
  return res
}

export const updateCourse = async (id, data) => {
  const res = await fetcher(`/courses/${id}`, { method: 'POST', body: data })
  return res
}

export const enrollCourse = async (courses) => {
  const res = await fetcher(`/courses/enroll`, {
    method: 'POST',
    body: { courses },
  })

  return res
}
