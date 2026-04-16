import React, { useState } from 'react'
import FormGroup from '../components/FormGroup'
import '../styles/form.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()

    const navigate = useNavigate()

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()

        await handleLogin({ email, password })
        navigate("/")
    }

    return (
        <main className='auth-page'>
            <div className="form-container">
                <span className="form-title">Login</span>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    {/* <FormGroup label="Username" id="username" placeholder="Enter your username" type="text" /> */}

                    <FormGroup
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        label="Email"
                        id="email"
                        placeholder="Enter your email"
                        type="email" />

                    <FormGroup
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        label="Password"
                        id="password"
                        placeholder="Enter your password"
                        type="password" />

                    <button className='button primary-button' type="submit">Login</button>

                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login