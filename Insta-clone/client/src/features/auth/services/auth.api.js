import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: `${API_BASE_URL}/api/auth`,
    withCredentials: true
})

export async function register(username, email, password) {
    try {
        const response = await api.post("register", {
            username,
            email,
            password
        })

        return response.data

    } catch (error) {
        throw error
    }
}

export async function login(username, password) {
    try {
        const response = await api.post("/login", {
            username,
            password
        })

        return response.data

    } catch (error) {
        throw error
    }
}