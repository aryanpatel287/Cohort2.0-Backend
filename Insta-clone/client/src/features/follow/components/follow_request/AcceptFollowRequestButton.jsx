import React from 'react'
import { useFollow } from '../../hooks/useFollow'

const AcceptFollowRequestButton = ({ followRecordId }) => {

    const { handleAcceptFollowRequest } = useFollow()

    async function runHandleAcceptFollowRequest(followRecordId) {
        await handleAcceptFollowRequest(followRecordId)
    }

    return (
        <button
            onClick={() => { runHandleAcceptFollowRequest(followRecordId) }}
            className='button primary-button small-button'>
            Accept
        </button>
    )
}

export default AcceptFollowRequestButton
