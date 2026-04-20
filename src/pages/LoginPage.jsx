import { useState } from 'react'
import BrandMark from '../components/BrandMark.jsx'
import Field from '../components/Field.jsx'

function LoginPage({ onLogin, onNavigate }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const updateField = (field) => (event) => {
    setForm((currentForm) => ({ ...currentForm, [field]: event.target.value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const result = onLogin(form)
    if (!result.ok) {
      setError(result.message)
    }
  }

  return (
    <main className="auth-screen">
      <section className="auth-panel" aria-labelledby="login-title">
        <BrandMark />

        <div className="auth-heading">
          <p className="eyebrow">Workspace access</p>
          <h1 id="login-title">Welcome back</h1>
          <p>Sign in to continue to your dashboard.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <Field
            autoComplete="email"
            id="login-email"
            label="Email"
            onChange={updateField('email')}
            placeholder="you@company.com"
            type="email"
            value={form.email}
          />
          <Field
            autoComplete="current-password"
            id="login-password"
            label="Password"
            onChange={updateField('password')}
            placeholder="Enter your password"
            type="password"
            value={form.password}
          />

          {error && <p className="form-alert">{error}</p>}

          <button className="primary-button" type="submit">
            <span>Log in</span>
            <svg viewBox="0 0 20 20" role="presentation" aria-hidden="true">
              <path d="M7.5 4.5 13 10l-5.5 5.5M13 10H3" />
            </svg>
          </button>
        </form>

        <p className="auth-switch">
          New to AuthDesk?
          <button type="button" onClick={() => onNavigate('/register')}>
            Create account
          </button>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
