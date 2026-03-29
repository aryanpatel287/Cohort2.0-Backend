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
            <h1>Loading...</h1>
        )
    }

    async function handleFormSubmit(e) {
        e.preventDefault()

        await handleRegister(username, email, password)
        navigate("/")
    }

    return (
        <main>
            <div className='form-container'>
                <h1>Register</h1>
                <form action="" onSubmit={(e) => { handleFormSubmit(e) }}>
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        value={username}
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder='Username'
                        required />
                    <input
                        onInput={(e) => { setEmail(e.target.value) }}
                        value={email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Email'
                        required />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        value={password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Password'
                        required />
                    <button type="submit" className='button primary-button'>Submit</button>
                </form>
                <p> Already have an account?  <Link className='toggle-auth-form' to="/login" >Login</Link> </p>

            </div>
        </main>
    )
}

export default Register
