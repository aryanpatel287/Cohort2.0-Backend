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

    return (
        <div className='list-wrapper'>
            <h4>Following</h4>
            <div className="user-list">
                {isHandleRunning && loading
                    ? "Loading"
                    : !acceptedFollowRecords.length
                        ? "No user followed"
                        : acceptedFollowRecords.map((followeeData) => {
                            return <UserListCard key={followeeData._id} userData={followeeData.followee} />
                        })}
            </div>
        </div>
    )
}

export default Following
