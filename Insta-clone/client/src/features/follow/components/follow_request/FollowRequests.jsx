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
        console.log(await handleAllFollowRequests())
        setIsHandleRunning(false)
    }

    useEffect(() => {
        runHandleAllFollowRequests()
    }, [])

    const pendingFollowRequests = (allFollowRequests || []).filter((followRequestData) => {
        return followRequestData.status === "pending"
    })

    return (
        <div className='list-wrapper'>
            <h4>Follow Requests</h4>
            <div className="user-list">
                {isHandleRunning && loading
                    ? "Loading"
                    : !pendingFollowRequests.length
                        ? "No Follow Requests"
                        : pendingFollowRequests.map((followRequestData) => {
                            return <div className="user-list-item">
                                <UserListCard key={followRequestData._id} userData={followRequestData.follower} />
                                <div className="user-action-button-wrapper">
                                    <AcceptFollowRequestButton key={followRequestData._id} followRecordId={followRequestData._id} />
                                    <RejectFollowRequestButton key={followRequestData._id} followRecordId={followRequestData._id} />
                                </div>
                            </div>
                        })}
            </div>
        </div>
    )
}

export default FollowRequests
