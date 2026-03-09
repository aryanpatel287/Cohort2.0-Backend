import axios from "axios"

export default async function fetchNotes() {
    try {
        const res = await axios.get('http://localhost:3000/api/notes')
        return res.data.notes
    } catch (error) {
        console.error('Error fetching notes', error)
        throw error
    }
}