import React, { useEffect, useState } from 'react'
import '../styles/user-profile.scss'
import { useUser } from '../hooks/useUser'
import { useNavigate, useParams } from 'react-router'
import FollowUserButton from '../../follow/components/follow_unfollow_buttons/FollowUserButton'
import UnFollowUserButton from '../../follow/components/follow_unfollow_buttons/UnfollowUserButton'
import { useAuth } from '../../auth/hooks/useAuth'

const UserProfile = () => {

    const { handleGetUser, requestedUser, loading } = useUser()
    const [followStatus, setFollowStatus] = useState(null)
    const navigate = useNavigate()
    const { username } = useParams()
    const { user } = useAuth()
    const activeUser = user

    const isFollowed = followStatus == "accepted"

    useEffect(() => {
        const runGetUser = async () => {
            if (!username) {
                navigate('/not-found', { replace: true })
                return
            }

            const foundUser = await handleGetUser(username)

            if (!foundUser) {
                navigate('/not-found', { replace: true })
                return
            }
            setFollowStatus(foundUser.followStatus)
        }

        runGetUser()
    }, [username])

    if (loading) {
        return (
            <div className='user-profile-wrapper'>
                <div className="user-not-found-wrapper">
                    <p>Loading profile...</p>
                </div>
            </div>
        )
    }

    if (!requestedUser) return null

    return (
        <div className='user-profile-wrapper'>
            <section className="user-details-section">
                <div className="user-profileImg-wrapper">
                    <img src={requestedUser.profileImage || "https://ik.imagekit.io/ji8wynr3i/userImage.avif?updatedAt=1773483702680"} alt="" className="user-profile" />
                </div>
                <div className="username-bio-wrapper">
                    <p className="username">{requestedUser.username}</p>
                    <p className="bio">{requestedUser.bio || ""}</p>
                </div>
            </section>
            {username !== activeUser.username ?
                <section className="action-buttons-section">
                    {isFollowed ? <UnFollowUserButton userId={requestedUser._id} followStatus={followStatus} setFollowStatus={setFollowStatus} /> : <FollowUserButton userId={requestedUser._id} followStatus={followStatus} setFollowStatus={setFollowStatus} />}
                </section> : ""}
            <section className="user-posts-section">

            </section>
        </div>
    )
}

export default UserProfile
