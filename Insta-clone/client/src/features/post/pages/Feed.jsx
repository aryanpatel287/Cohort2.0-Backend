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
        return <main className="feed-page"><h1>Feed loading...</h1></main>
    }
    console.log(feed)
    return (
        <div className="feed-page">
            <div className="feed">
                <div className="posts">
                    {feed.map((post) => {
                        return <Post user={post.user} post={post} loading={loading} handleLikePost={handleLikePost} handleUnLikePost={handleUnLikePost} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Feed
