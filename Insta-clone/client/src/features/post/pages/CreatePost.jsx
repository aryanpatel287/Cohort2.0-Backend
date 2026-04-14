import React, { useRef, useState } from 'react'
import '../styles/create-post.scss'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {
    const [caption, setCaption] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const postImageInputRef = useRef(null)

    const navigate = useNavigate()
    const { handleCreatePost } = usePost()

    const handleSubmit = (e) => {
        e.preventDefault();
        const imageFile = postImageInputRef.current.files[0]
        handleCreatePost(imageFile, caption)
        navigate('/')
    }

    const handleImagePreview = (e) => {
        if (!e.target.files[0]) return
        const imagePreviewUrl = URL.createObjectURL(e.target.files[0])
        setImagePreview(imagePreviewUrl)
    }

    return (
        <div className='create-post-page'>
            <div className='create-post-wrapper'>
                <div className="create-post-header">
                    <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate('/')}
                        aria-label="Go back"
                    >
                        <i className="ri-arrow-left-line" aria-hidden="true" />
                    </button>
                    <h1>New Post</h1>
                </div>

                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <div className="image-preview-wrapper">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="image-preview" />
                        ) : (
                            <div className="no-image-placeholder">
                                <i className="ri-image-add-line" aria-hidden="true" />
                                <span>No image selected</span>
                            </div>
                        )}
                    </div>

                    <label htmlFor="postImageInput" className="file-label">
                        <i className="ri-upload-2-line" aria-hidden="true" />
                        {imagePreview ? 'Change Image' : 'Select Image'}
                    </label>
                    <input
                        onInput={(e) => { handleImagePreview(e) }}
                        ref={postImageInputRef}
                        type="file"
                        accept="image/*"
                        name="postImageInput"
                        id="postImageInput"
                        hidden
                    />

                    <textarea
                        required
                        onInput={(e) => { setCaption(e.target.value) }}
                        value={caption || ''}
                        name="postCaptionInput"
                        id="postCaptionInput"
                        placeholder='Write a caption…'
                    />

                    <button type="submit" className='button primary-button'>
                        <i className="ri-send-plane-line" aria-hidden="true" />
                        Share Post
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
