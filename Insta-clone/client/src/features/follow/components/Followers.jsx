import React, { useEffect, useState } from 'react'
import '../../shared/styles/user-list-wrapper.scss'
import { useFollow } from '../hooks/useFollow'
import UserListCard from '../../shared/components/UserListCard'

const Followers = () => {
    const { followerRecords, loading, handleAllFollowRecords } = useFollow()
    const [isHandleRunning, setIsHandleRunning] = useState(false)

    async function runHandleAllFollowRecords() {
        setIsHandleRunning(true)
        await handleAllFollowRecords()
        setIsHandleRunning(false)
    }

    useEffect(() => {
        runHandleAllFollowRecords()
    }, [])

    const acceptedFollowRecords = (followerRecords || []).filter((followRecord) => {
        return followRecord.status === "accepted"
    })

    const isLoading = isHandleRunning && loading

    return (
        <div className='list-wrapper'>
            <div className="list-header">
                <h4>Followers</h4>
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
                        <i className="ri-user-heart-line" aria-hidden="true" />
                        <p>No followers yet</p>
                    </div>
                ) : (
                    acceptedFollowRecords.map((followRecord) => (
                        <UserListCard key={followRecord._id} userData={followRecord.follower} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Followers
