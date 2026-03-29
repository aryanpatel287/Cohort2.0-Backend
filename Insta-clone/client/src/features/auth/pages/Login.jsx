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
            <h1>Loading...</h1>
        )
    }

    async function handleFormSubmit(e) {
        e.preventDefault()

        handleLogin(username, password)
            .then(res => {
                console.log(res)
                navigate("/")
            })
    }

    return (
        <main>
            <div className='form-container'>
                <h1>Login</h1>
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
                        onInput={(e) => { setPassword(e.target.value) }}
                        value={password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Password'
                        required />
                    <button type="submit">Submit</button>
                </form>

                <p> Don't have an account?  <Link className='toggle-auth-form' to="/register" >Register</Link> </p>
            </div>
        </main>
    )
}

export default Login
