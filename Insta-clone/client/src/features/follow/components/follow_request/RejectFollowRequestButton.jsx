import React from 'react'
import { useFollow } from '../../hooks/useFollow'

const RejectFollowRequestButton = ({ followRecordId }) => {

    const { handleRejectFollowRequest } = useFollow()

    async function runHandleRejectFollowRequest(followRecordId) {
        await handleRejectFollowRequest
    }

    return (
        <button
            onClick={() => runHandleRejectFollowRequest(followRecordId)}
            className='button secondary-button small-button'>
            Reject
        </button>
    )
}

export default RejectFollowRequestButton
