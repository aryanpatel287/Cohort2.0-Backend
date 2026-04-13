import React, { useState } from 'react'
import { useFollow } from '../../hooks/useFollow'

const FollowUserButton = ({ userId, followStatus, setFollowStatus }) => {

    const { handleFollowUser } = useFollow()

    async function runHandleFollowUser(userId) {
        const followRecord = await handleFollowUser(userId)
        setFollowStatus(followRecord.status)
    }
    const isFollowPending = followStatus === "pending"

    return (
        <button
            onClick={() => { runHandleFollowUser(userId) }}
            disabled={isFollowPending}
            className={isFollowPending ? 'button secondary-button disabled' : 'button primary-button'}>
            {isFollowPending ? 'Request sent' : 'Follow'}
        </button>
    )
}

export default FollowUserButton
