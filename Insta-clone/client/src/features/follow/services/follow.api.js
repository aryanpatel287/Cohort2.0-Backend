import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true
})

export async function followUser(userId) {
    try {
        const response = await api.post("/follow/" + userId)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function unfollowUser(userId) {
    try {
        const response = await api.post("/unfollow/" + userId)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getAllFollowRecords() {
    try {
        const response = await api.get("/follow/all-follow-records")
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getAllFollowRequests() {
    try {
        const response = await api.get("/follow/requests")
        console.log("followApi: ", response.data)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function acceptFollowRequest(followRecordId) {
    try {
        const response = await api.patch("/follow/requests/accept/" + followRecordId)
        return response.data
    } catch (error) {
        throw error
    }

}
export async function rejectFollowRequest(followRecordId) {
    try {
        const response = await api.patch("/follow/requests/reject/" + followRecordId)
        return response.data
    } catch (error) {
        throw error
    }
}