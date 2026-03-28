import React, { useState } from 'react'
import '../styles/form.scss'
import { Link } from 'react-router'
import axios from 'axios'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleFormSubmit(e) {
        e.preventDefault()

        axios.post("http://localhost:3000/api/auth/login", {
            username,
            password
        }, {
            withCredentials: true
        })
            .then(res => {
                console.log(res.data)
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
                        placeholder='Username' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        value={password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Password' />
                    <button type="submit">Submit</button>
                </form>

                <p> Don't have an account?  <Link className='toggle-auth-form' to="/register" >Register</Link> </p>
            </div>
        </main>
    )
}

export default Login
