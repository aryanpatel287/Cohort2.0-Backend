import React from 'react'
import { useAuth } from '../hooks/useAuth'
import "../styles/active-user.scss"

const ActiveUser = () => {

    const { user, loading, handleLogout } = useAuth()

    if (loading) {
        return <p className='active-user-loading'>loading...</p>
    }

    if (!user) return null

    return (
        <div className='active-user'>
            <p className='active-user-name'>{user.username}</p>
            <button
                className='button primary-button'
                onClick={() => { handleLogout() }}
            >
                Logout
            </button>
        </div>
    )
}

export default ActiveUser