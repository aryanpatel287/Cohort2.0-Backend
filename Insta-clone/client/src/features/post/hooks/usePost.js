import { useContext, useEffect } from 'react';
import { PostContext } from '../post.context';
import {
    createPost,
    getFeed,
    likePost,
    unlikePost,
} from '../services/post.api';

export const usePost = () => {
    const context = useContext(PostContext);

    const { loading, setLoading, post, setPost, feed, setFeed } = context;

    const handleGetFeed = async () => {
        setLoading(true);
        const data = await getFeed();
        setFeed(data.posts.reverse());
        setLoading(false);
    };

    const handleCreatePost = async (imageFile, caption) => {
        const data = await createPost(imageFile, caption);
    };

    const handleLikePost = async (postId) => {
        setFeed((prevFeed) =>
            prevFeed
                ? prevFeed.map((p) =>
                      p._id === postId
                          ? { ...p, isLiked: true, likeCount: p.likeCount + 1 }
                          : p,
                  )
                : null,
        );

        try {
            await likePost(postId);
        } catch (error) {
            console.error('Failed to like post:', error);
            setFeed((prevFeed) =>
                prevFeed
                    ? prevFeed.map((p) =>
                          p._id === postId
                              ? {
                                    ...p,
                                    isLiked: false,
                                    likeCount: Math.max(0, p.likeCount - 1),
                                }
                              : p,
                      )
                    : null,
            );
        }
    };

    const handleUnLikePost = async (postId) => {
        setFeed((prevFeed) =>
            prevFeed
                ? prevFeed.map((p) =>
                      p._id === postId
                          ? {
                                ...p,
                                isLiked: false,
                                likeCount: Math.max(0, p.likeCount - 1),
                            }
                          : p,
                  )
                : null,
        );

        try {
            await unlikePost(postId);
        } catch (error) {
            console.error('Failed to unlike post:', error);
            setFeed((prevFeed) =>
                prevFeed
                    ? prevFeed.map((p) =>
                          p._id === postId
                              ? {
                                    ...p,
                                    isLiked: true,
                                    likeCount: p.likeCount + 1,
                                }
                              : p,
                      )
                    : null,
            );
        }
    };

    useEffect(() => {
        handleGetFeed();
    }, []);

    return {
        loading,
        feed,
        post,
        handleGetFeed,
        handleCreatePost,
        handleLikePost,
        handleUnLikePost,
    };
};
