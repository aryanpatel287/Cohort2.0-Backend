import React, { useEffect } from 'react';
import '../styles/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost';

const Feed = () => {
    const { feed, handleGetFeed, loading, handleLikePost, handleUnLikePost } = usePost()

    useEffect(() => {
        handleGetFeed()
    }, [])

    if (loading || !feed) {
        return (
            <div className="feed-page">
                <div className="feed-loading">
                    {[1, 2].map((n) => (
                        <div key={n} className="skeleton-post">
                            <div className="skeleton-header">
                                <div className="skeleton-avatar" />
                                <div className="skeleton-name" />
                            </div>
                            <div className="skeleton-image" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (feed.length === 0) {
        return (
            <div className="feed-page">
                <div className="feed-empty-state">
                    <i className="ri-camera-line" aria-hidden="true" />
                    <h3>No posts yet</h3>
                    <p>Follow people or create your first post to get started.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="feed-page">
            <div className="feed">
                <div className="posts">
                    {feed.map((post) => (
                        <Post
                            key={post._id}
                            user={post.user}
                            post={post}
                            loading={loading}
                            handleLikePost={handleLikePost}
                            handleUnLikePost={handleUnLikePost}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Feed
