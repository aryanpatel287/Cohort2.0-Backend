import React, { useState } from 'react'
import { useFollow } from '../../hooks/useFollow'

const UnFollowUserButton = ({ userId, followStatus, setFollowStatus }) => {

    const { handleUnfollowUser } = useFollow()
    async function runHandleUnfollowUser(userId) {
        await handleUnfollowUser(userId)
        setFollowStatus("none")
    }

    return (
        <button
            onClick={() => { runHandleUnfollowUser(userId) }}
            className='button primary-button'>
            Unfollow
        </button>
    )
}

export default UnFollowUserButton
