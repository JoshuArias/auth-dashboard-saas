import { useCallback, useEffect, useState } from 'react'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { getSessionUser, loginUser, logoutUser, registerUser } from './utils/authStorage.js'
import './App.css'

const KNOWN_ROUTES = ['/', '/login', '/register', '/dashboard']

function normalizePath(pathname) {
  return KNOWN_ROUTES.includes(pathname) ? pathname : '/'
}

function resolvePath(pathname, user) {
  if (user && ['/', '/login', '/register'].includes(pathname)) {
    return '/dashboard'
  }

  if (!user && ['/', '/dashboard'].includes(pathname)) {
    return '/login'
  }

  return pathname
}

function replaceBrowserPath(pathname) {
  if (window.location.pathname !== pathname) {
    window.history.replaceState({}, '', pathname)
  }
}

function getInitialAppState() {
  const currentUser = getSessionUser()
  const requestedPath = normalizePath(window.location.pathname)
  const path = resolvePath(requestedPath, currentUser)

  replaceBrowserPath(path)

  return { currentUser, path }
}

function App() {
  const [{ currentUser, path }, setAppState] = useState(getInitialAppState)

  const navigate = useCallback((to, options = {}) => {
    const requestedPath = normalizePath(to)
    const nextPath = resolvePath(requestedPath, currentUser)
    const method = options.replace ? 'replaceState' : 'pushState'

    window.history[method]({}, '', nextPath)
    setAppState((state) => ({ ...state, path: nextPath }))
  }, [currentUser])

  useEffect(() => {
    const handlePopState = () => {
      setAppState((state) => {
        const requestedPath = normalizePath(window.location.pathname)
        const nextPath = resolvePath(requestedPath, state.currentUser)

        replaceBrowserPath(nextPath)

        return { ...state, path: nextPath }
      })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleLogin = (credentials) => {
    const result = loginUser(credentials)

    if (!result.ok) {
      return result
    }

    window.history.replaceState({}, '', '/dashboard')
    setAppState({ currentUser: result.user, path: '/dashboard' })
    return result
  }

  const handleRegister = (userInput) => {
    const result = registerUser(userInput)

    if (!result.ok) {
      return result
    }

    window.history.replaceState({}, '', '/dashboard')
    setAppState({ currentUser: result.user, path: '/dashboard' })
    return result
  }

  const handleLogout = () => {
    logoutUser()
    window.history.replaceState({}, '', '/login')
    setAppState({ currentUser: null, path: '/login' })
  }

  if (path === '/register') {
    return <RegisterPage onRegister={handleRegister} onNavigate={navigate} />
  }

  if (path === '/dashboard') {
    return (
      <ProtectedRoute user={currentUser} onRedirect={() => navigate('/login', { replace: true })}>
        <DashboardPage user={currentUser} onLogout={handleLogout} />
      </ProtectedRoute>
    )
  }

  return <LoginPage onLogin={handleLogin} onNavigate={navigate} />
}

export default App
