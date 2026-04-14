import React, { useState } from 'react'
import '../styles/form.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { handleLogin, loading } = useAuth()
    const navigate = useNavigate()

    if (loading) {
        return (
            <div className="auth-page">
                <div className="auth-loading-card">
                    <div className="skeleton-line skeleton-line--short" />
                    <div className="skeleton-line skeleton-line--full" />
                    <div className="skeleton-line skeleton-line--full" />
                    <div className="skeleton-line skeleton-line--full" />
                </div>
            </div>
        )
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        await handleLogin(username, password)
        navigate("/")
    }

    return (
        <main className="auth-page">
            <div className='form-container'>
                <p className="auth-brand-name">Not Instagram</p>
                <h1>Welcome back</h1>
                <form onSubmit={(e) => { handleFormSubmit(e) }}>
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        value={username}
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder='Username'
                        autoComplete="username"
                        required />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        value={password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Password'
                        autoComplete="current-password"
                        required />
                    <button type="submit" className='button primary-button'>Sign in</button>
                </form>
                <p className="auth-footer">
                    Don't have an account?
                    <Link className='toggle-auth-form' to="/register">Register</Link>
                </p>
            </div>
        </main>
    )
}

export default Login
