import React from 'react'
import { useContext } from 'react'
import { NotesDataContext } from '../../../context/NotesContext'
import axios from 'axios'
import fetchNotes from '../../../api/NotesApi'

const NoteDelete = ({ noteId }) => {
    const { notes, setNotes } = useContext(NotesDataContext)

    function handleDelete(noteId) {
        console.log(noteId)
        axios.delete("http://localhost:3000/api/notes/" + noteId)
            .then(async () => {
                const updatedNotes = await fetchNotes()
                setNotes(updatedNotes)
            })
    }

    return (
        <i onClick={(e) => { e.stopPropagation(); handleDelete(noteId) }} class="ri-delete-bin-2-line"></i>
    )
}

export default NoteDelete
