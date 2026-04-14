import React, { useEffect, useState } from 'react'
import '../../../shared/styles/user-list-wrapper.scss'
import { useFollow } from '../../hooks/useFollow'
import UserListCard from '../../../shared/components/UserListCard'
import AcceptFollowRequestButton from './AcceptFollowRequestButton'
import RejectFollowRequestButton from './RejectFollowRequestButton'

const FollowRequests = () => {
    const { allFollowRequests, loading, handleAllFollowRequests } = useFollow()
    const [isHandleRunning, setIsHandleRunning] = useState(false)

    async function runHandleAllFollowRequests() {
        setIsHandleRunning(true)
        await handleAllFollowRequests()
        setIsHandleRunning(false)
    }

    useEffect(() => {
        runHandleAllFollowRequests()
    }, [])

    const pendingFollowRequests = (allFollowRequests || []).filter((followRequestData) => {
        return followRequestData.status === "pending"
    })

    const isLoading = isHandleRunning && loading

    return (
        <div className='list-wrapper'>
            <div className="list-header">
                <h4>Requests</h4>
            </div>
            <div className="user-list">
                {isLoading ? (
                    <div className="list-state--loading">
                        {[1, 2].map((n) => (
                            <div key={n} className="skeleton-row">
                                <div className="skeleton-avatar" />
                                <div className="skeleton-text" />
                            </div>
                        ))}
                    </div>
                ) : !pendingFollowRequests.length ? (
                    <div className="list-state--empty">
                        <i className="ri-user-received-line" aria-hidden="true" />
                        <p>No pending requests</p>
                    </div>
                ) : (
                    pendingFollowRequests.map((followRequestData) => (
                        <div key={followRequestData._id} className="user-list-item">
                            <UserListCard userData={followRequestData.follower} />
                            <div className="user-action-button-wrapper">
                                <AcceptFollowRequestButton followRecordId={followRequestData._id} />
                                <RejectFollowRequestButton followRecordId={followRequestData._id} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default FollowRequests
