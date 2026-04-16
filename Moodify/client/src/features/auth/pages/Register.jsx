import React, { useState } from 'react'
import FormGroup from '../components/FormGroup'
import '../styles/form.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const { loading, handleRegister } = useAuth()

    const navigate = useNavigate()

    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(username, email, password)
        await handleRegister({ username, email, password })
        navigate("/")
    }

    return (
        <main className='auth-page'>
            <div>
                <div className="form-container">
                    <span className="form-title">Register</span>
                    <form onSubmit={(e) => { handleSubmit(e) }}>

                        <FormGroup
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            label="Username"
                            id="username"
                            placeholder="Enter your username"
                            type="text" />

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

                        <button className='button primary-button' type="submit">Register</button>

                    </form>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Register