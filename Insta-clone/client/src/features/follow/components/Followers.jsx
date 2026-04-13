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

	return (
		<div className='list-wrapper'>
			<h4>Followers</h4>
			<div className="user-list">
				{isHandleRunning && loading
					? "Loading"
					: !acceptedFollowRecords.length
						? "No user followed"
						: acceptedFollowRecords.map((followRecord) => {
							return <UserListCard key={followRecord._id} userData={followRecord.follower} />
						})}
			</div>
		</div>
	)
}

export default Followers
