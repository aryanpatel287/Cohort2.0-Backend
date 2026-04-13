import React, { useEffect, useState } from 'react'
import { useUser } from '../hooks/useUser'
import UserListCard from '../../shared/components/UserListCard'
import { useAuth } from '../../auth/hooks/useAuth'

const NotFollowedUsers = () => {
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

    return (
        <div className='list-wrapper'>
            <h4>Other Users</h4>
            <div className="user-list">
                {isHandleRunning && loading
                    ? "Loading"
                    : !otherUsers.length
                        ? "No users found"
                        : otherUsers.map((userData) => {
                            return <UserListCard key={userData._id} userData={userData} />
                        })}
            </div>
        </div>
    )
}

export default NotFollowedUsers
