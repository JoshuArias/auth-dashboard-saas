const USERS_KEY = 'auth-dashboard:users'
const SESSION_KEY = 'auth-dashboard:session'

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

function publicUser(user) {
  if (!user) {
    return null
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }
}

function getUsers() {
  const users = readStorage(USERS_KEY, [])
  return Array.isArray(users) ? users : []
}

function saveUsers(users) {
  writeStorage(USERS_KEY, users)
}

function saveSession(userId) {
  writeStorage(SESSION_KEY, {
    userId,
    startedAt: new Date().toISOString(),
  })
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function getSessionUser() {
  const session = readStorage(SESSION_KEY, null)

  if (!session?.userId) {
    return null
  }

  const user = getUsers().find((storedUser) => storedUser.id === session.userId)
  return publicUser(user)
}

export function registerUser({ name, email, password }) {
  const cleanName = name.trim()
  const cleanEmail = normalizeEmail(email)
  const cleanPassword = password.trim()

  if (!cleanName || !cleanEmail || !cleanPassword) {
    return { ok: false, message: 'Please fill in every field.' }
  }

  if (!isValidEmail(cleanEmail)) {
    return { ok: false, message: 'Enter a valid email address.' }
  }

  if (cleanPassword.length < 6) {
    return { ok: false, message: 'Password must be at least 6 characters.' }
  }

  const users = getUsers()
  const emailExists = users.some((user) => user.email === cleanEmail)

  if (emailExists) {
    return { ok: false, message: 'An account already exists with that email.' }
  }

  const user = {
    id: crypto.randomUUID(),
    name: cleanName,
    email: cleanEmail,
    password: cleanPassword,
    createdAt: new Date().toISOString(),
  }

  saveUsers([...users, user])
  saveSession(user.id)

  return { ok: true, user: publicUser(user) }
}

export function loginUser({ email, password }) {
  const cleanEmail = normalizeEmail(email)
  const cleanPassword = password.trim()
  const user = getUsers().find(
    (storedUser) => storedUser.email === cleanEmail && storedUser.password === cleanPassword,
  )

  if (!user) {
    return { ok: false, message: 'Email or password is incorrect.' }
  }

  saveSession(user.id)

  return { ok: true, user: publicUser(user) }
}

export function logoutUser() {
  window.localStorage.removeItem(SESSION_KEY)
}
