import React, { useState } from 'react'
import '../styles/form.scss'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { handleRegister, loading } = useAuth()
    const navigate = useNavigate()

    if (loading) {
        return (
            <div className="auth-page">
                <div className="auth-loading-card">
                    <div className="skeleton-line skeleton-line--short" />
                    <div className="skeleton-line skeleton-line--full" />
                    <div className="skeleton-line skeleton-line--full" />
                    <div className="skeleton-line skeleton-line--full" />
                    <div className="skeleton-line skeleton-line--full" />
                </div>
            </div>
        )
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        await handleRegister(username, email, password)
        navigate("/")
    }

    return (
        <main className="auth-page">
            <div className='form-container'>
                <p className="auth-brand-name">Not Instagram</p>
                <h1>Create an account</h1>
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
                        onInput={(e) => { setEmail(e.target.value) }}
                        value={email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Email'
                        autoComplete="email"
                        required />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        value={password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Password'
                        autoComplete="new-password"
                        required />
                    <button type="submit" className='button primary-button'>Create account</button>
                </form>
                <p className="auth-footer">
                    Already have an account?
                    <Link className='toggle-auth-form' to="/login">Sign in</Link>
                </p>
            </div>
        </main>
    )
}

export default Register
