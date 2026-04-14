import React, { useEffect, useState } from 'react'
import { useUser } from '../hooks/useUser'
import '../../shared/styles/user-list-wrapper.scss'
import UserListCard from '../../shared/components/UserListCard'
import { useAuth } from '../../auth/hooks/useAuth'

const OtherUsers = () => {
    const { user } = useAuth()
    const { allUsers, loading, handleGetAllUsers } = useUser()
    const [isHandleRunning, setIsHandleRunning] = useState(false)

    async function runHandleGetAllUsers() {
        setIsHandleRunning(true)
        await handleGetAllUsers()
        setIsHandleRunning(false)
    }

    useEffect(() => {
        runHandleGetAllUsers()
    }, [])

    const otherUsers = (allUsers || []).filter((userData) => {
        return userData.username !== user?.username
    })

    const isLoading = isHandleRunning && loading

    return (
        <div className='list-wrapper'>
            <div className="list-header">
                <h4>Discover</h4>
            </div>
            <div className="user-list">
                {isLoading ? (
                    <div className="list-state--loading">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="skeleton-row">
                                <div className="skeleton-avatar" />
                                <div className="skeleton-text" />
                            </div>
                        ))}
                    </div>
                ) : !otherUsers.length ? (
                    <div className="list-state--empty">
                        <i className="ri-user-search-line" aria-hidden="true" />
                        <p>No other users found</p>
                    </div>
                ) : (
                    otherUsers.map((userData) => (
                        <UserListCard key={userData._id} userData={userData} />
                    ))
                )}
            </div>
        </div>
    )
}

export default OtherUsers
