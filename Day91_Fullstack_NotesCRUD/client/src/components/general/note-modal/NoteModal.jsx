import React, { useState, useContext } from 'react'
import './note-modal.css'
import axios from 'axios'
import { NotesDataContext } from '../../../context/NotesContext'

const NoteModal = ({ note }) => {
    const [titleInput, setTitleInput] = useState(note.title)
    const [descriptionInput, setDescriptionInput] = useState(note.description)
    const { notes, setNotes, selectedNote, setSelectedNote,setNotesData } = useContext(NotesDataContext)

    function handleUpdate(e) {
        e.preventDefault()

        axios.patch(`http://localhost:3000/api/notes/${note._id}`, {
            title: titleInput,
            description: descriptionInput
        }).then(async (res) => {
            console.log('Note Updated successfully')
            setNotesData()
            setSelectedNote(null)
        })
    }

    return (
        <div className='modal-overlay'>
            <div className="modal">
                <input
                    type="text"
                    name='title'
                    className='modal-title'
                    id="note-title"
                    value={titleInput}
                    onChange={(e) => { setTitleInput(e.target.value) }}
                />

                <textarea
                    type="text"
                    name="description"
                    className='modal-description'
                    id="note-description"
                    value={descriptionInput}
                    onChange={(e) => { setDescriptionInput(e.target.value) }}
                ></textarea>

                <div className="modal-buttons">
                    <button type="submit" onClick={(e) => { handleUpdate(e) }}>Save</button>
                    <button onClick={() => setSelectedNote(null)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default NoteModal
