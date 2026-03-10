import api from "./axiosInstance"

export default async function fetchNotes() {
    try {
        const res = await api.get('/api/notes')
        return res.data.notes
    } catch (error) {
        console.error('Error fetching notes', error)
        throw error
    }
}