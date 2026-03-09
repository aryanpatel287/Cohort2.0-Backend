import React, { useContext, useState } from 'react'
import { NotesDataContext } from '../../../context/NotesContext'
import axios from 'axios'
import './note-input.css'

const NoteInput = () => {
    const { notes, setNotes, selectedNote, setSelectedNote, setNotesData } = useContext(NotesDataContext)
    const [titleInput, setTitleInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        const { title, description } = e.target.elements

        axios.post('http://localhost:3000/api/notes', {
            title: title.value,
            description: description.value
        }).then(res => {
            setNotesData()
        })
    }


    return (
        <form action="" onSubmit={(e) => handleSubmit(e)}>
            <input
                type="text"
                name='title'
                className='title-input'
                id="note-title"
                value={titleInput}
                onChange={(e) => { setTitleInput(e.target.value) }}
            />
            <input
                type="text"
                name="description"
                className='description-input'
                id="note-description"
                value={descriptionInput}
                onChange={(e) => { setDescriptionInput(e.target.value) }}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default NoteInput