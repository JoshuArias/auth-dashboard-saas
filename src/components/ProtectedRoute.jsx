import { useEffect } from 'react'

function ProtectedRoute({ user, onRedirect, children }) {
  useEffect(() => {
    if (!user) {
      onRedirect()
    }
  }, [onRedirect, user])

  if (!user) {
    return null
  }

  return children
}

export default ProtectedRoute
