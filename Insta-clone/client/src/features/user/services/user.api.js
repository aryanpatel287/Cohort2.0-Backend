import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/user",
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