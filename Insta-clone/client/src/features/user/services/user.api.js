import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: `${API_BASE_URL}/api/user`,
    withCredentials: true
})

export async function getAllUsers() {
    try {
        const response = await api.get("/")
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getMe() {
    try {
        const response = await api.get("/get-me")
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getUser(username) {
    try {
        const response = await api.get("/get-user/" + username)
        return response.data
    } catch (error) {
        throw error
    }
}