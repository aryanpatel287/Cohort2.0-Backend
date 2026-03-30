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
        console.log(postImageInputRef)
        const imageFile = postImageInputRef.current.files[0]
        handleCreatePost(imageFile, caption)
        navigate('/')
    }

    const handleImagePreview = (e) => {
        const imagePreviewUrl = URL.createObjectURL(e.target.files[0])
        setImagePreview(imagePreviewUrl)
    }

    return (
        <div className='create-post-wrapper'>
            <form action="" onSubmit={(e) => { handleSubmit(e) }}>
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                <label htmlFor="postImageInput" className="postImageInputLabel">
                    Select Image
                </label>
                <input onInput={(e) => { handleImagePreview(e) }} ref={postImageInputRef} type="file" name="postImageInput" id="postImageInput" hidden />
                <textarea required onInput={(e) => { setCaption(e.target.value) }} value={caption} name="postCaptionInput" id="postCaptionInput" placeholder='Enter Caption' className="postCaptionInput" />
                <button type="submit" className='button primary-button'>Create Post</button>
            </form>
        </div>
    )
}

export default CreatePost
