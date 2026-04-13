import React from 'react'
import '../styles/user-list-card.scss'
import { useNavigate } from 'react-router'
const UserListCard = ({ userData }) => {
    const safeUserData = userData || {}
    const navigate = useNavigate()
    const { username, profileImage } = safeUserData
    return (
        <div
            onClick={() => { navigate('/user/' + username) }}
            className='user-list-card-wrapper'
        >
            <div className="user-details">
                <img src={profileImage || "https://ik.imagekit.io/ji8wynr3i/userImage.avif?updatedAt=1773483702680"} alt="" className="user-avatar" />
                <p className="username">{username || 'Unknown user'}</p>
            </div>
        </div>
    )
}

export default UserListCard
