import { useState } from 'react'
import BrandMark from '../components/BrandMark.jsx'
import Field from '../components/Field.jsx'

function RegisterPage({ onRegister, onNavigate }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const updateField = (field) => (event) => {
    setForm((currentForm) => ({ ...currentForm, [field]: event.target.value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const result = onRegister(form)
    if (!result.ok) {
      setError(result.message)
    }
  }

  return (
    <main className="auth-screen">
      <section className="auth-panel" aria-labelledby="register-title">
        <BrandMark />

        <div className="auth-heading">
          <p className="eyebrow">Start your workspace</p>
          <h1 id="register-title">Create your account</h1>
          <p>Set up your secure dashboard in seconds.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <Field
            autoComplete="name"
            id="register-name"
            label="Full name"
            onChange={updateField('name')}
            placeholder="Alex Morgan"
            value={form.name}
          />
          <Field
            autoComplete="email"
            id="register-email"
            label="Email"
            onChange={updateField('email')}
            placeholder="alex@company.com"
            type="email"
            value={form.email}
          />
          <Field
            autoComplete="new-password"
            id="register-password"
            label="Password"
            onChange={updateField('password')}
            placeholder="Minimum 6 characters"
            type="password"
            value={form.password}
          />

          {error && <p className="form-alert">{error}</p>}

          <button className="primary-button" type="submit">
            <span>Sign up</span>
            <svg viewBox="0 0 20 20" role="presentation" aria-hidden="true">
              <path d="M7.5 4.5 13 10l-5.5 5.5M13 10H3" />
            </svg>
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?
          <button type="button" onClick={() => onNavigate('/login')}>
            Log in
          </button>
        </p>
      </section>
    </main>
  )
}

export default RegisterPage
