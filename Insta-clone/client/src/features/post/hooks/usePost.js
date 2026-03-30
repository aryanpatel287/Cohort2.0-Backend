import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { createPost, getFeed, likePost, unlikePost } from "../services/post.api";


export const usePost = () => {
    const context = useContext(PostContext)

    const { loading, setLoading, post, setPost, feed, setFeed } = context

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts.reverse())
        setLoading(false)
    }

    const handleCreatePost = async (imageFile, caption) => {
        const data = await createPost(imageFile, caption)
    }

    const handleLikePost = async (postId) => {
        const data = await likePost(postId)
        await handleGetFeed()
    }

    const handleUnLikePost = async (postId) => {
        const data = await unlikePost(postId)
        await handleGetFeed()
    }

    useEffect(() => {
        handleGetFeed()
    }, [])


    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLikePost, handleUnLikePost }
}