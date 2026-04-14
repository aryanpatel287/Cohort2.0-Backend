import React, { useEffect, useState } from 'react'
import { useFollow } from '../hooks/useFollow'
import '../../shared/styles/user-list-wrapper.scss'
import UserListCard from '../../shared/components/UserListCard'

const Following = () => {
    const { followingRecords, loading, handleAllFollowRecords } = useFollow()
    const [isHandleRunning, setIsHandleRunning] = useState(false)

    async function runHandleAllFollowRecords() {
        setIsHandleRunning(true)
        await handleAllFollowRecords()
        setIsHandleRunning(false)
    }

    useEffect(() => {
        runHandleAllFollowRecords()
    }, [])

    const acceptedFollowRecords = (followingRecords || []).filter((followeeData) => {
        return followeeData.status === "accepted"
    })

    const isLoading = isHandleRunning && loading

    return (
        <div className='list-wrapper'>
            <div className="list-header">
                <h4>Following</h4>
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
                ) : !acceptedFollowRecords.length ? (
                    <div className="list-state--empty">
                        <i className="ri-user-add-line" aria-hidden="true" />
                        <p>Not following anyone yet</p>
                    </div>
                ) : (
                    acceptedFollowRecords.map((followeeData) => (
                        <UserListCard key={followeeData._id} userData={followeeData.followee} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Following
