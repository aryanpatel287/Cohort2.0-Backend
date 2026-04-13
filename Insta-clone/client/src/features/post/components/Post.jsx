import React from 'react'
import { useNavigate } from 'react-router'

const Post = ({ user, post, loading, handleLikePost, handleUnLikePost }) => {

    const navigate = useNavigate()

    return (
        <div className="post">
            <div className="user-details-wrapper">
                <div className="user-image-wrapper">
                    <img src={user.profileImage} alt="user-image" className="user-image" />
                </div>
                <p
                    onClick={() => { navigate('/user/' + user.username) }}
                    className="username">
                    {user.username}
                </p>
            </div>
            <div className="post-image-wrapper">
                <img src={post.imageUrl} alt="post-image" className='post-image' />
            </div>
            <div className="post-actions-wrapper">
                <div className="left">
                    <button type="button" aria-label="Like post" className={post.isLiked ? "liked action-with-count" : "action-with-count"}>
                        <i onClick={() => { post.isLiked ? handleUnLikePost(post._id) : handleLikePost(post._id) }} className={post.isLiked ? "ri-heart-fill" : "ri-heart-line"}></i>
                        <span className="action-count">{post.likeCount}</span>
                    </button>
                    <button type="button" aria-label="Open comments" className="action-with-count">
                        <i className="ri-chat-3-line"></i>
                        <span className="action-count">0</span>
                    </button>
                    <button type="button" aria-label="Share post">
                        <i className="ri-send-ins-line"></i>
                    </button>
                </div>
                <div className="right">
                    <button type="button" aria-label="Save post">
                        <i className="ri-bookmark-line"></i>
                    </button>
                </div>
            </div>
            <div className="post-caption-wrapper">
                <p className="post-caption">{post.caption}</p>
            </div>
        </div>
    )
}

export default Post
