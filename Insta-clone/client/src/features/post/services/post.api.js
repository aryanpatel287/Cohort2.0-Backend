import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true
})

export async function getFeed() {
    const response = await api.get("/posts/feed")
    return response.data
}

export async function createPost(imageFile, caption) {

    const formData = new FormData()

    formData.append("image", imageFile)
    formData.append("caption", caption)

    const response = await api.post("/posts", formData)

    console.log(response)

    return response.data
}

export async function likePost(postId) {
    const response = await api.post("/posts/like/" + postId)
    return response.data
}

export async function unlikePost(postId) {
    const response = await api.post("/posts/unlike/" + postId)
    return response.data
}
