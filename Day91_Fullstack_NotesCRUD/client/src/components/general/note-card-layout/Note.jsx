import React from 'react'
import './note.css'
import NoteDelete from '../note-delete/NoteDelete'
import { useContext } from 'react'
import { NotesDataContext } from '../../../context/NotesContext'
const Note = ({note}) => {
    const {notes, setNotes,selectedNote, setSelectedNote} = useContext(NotesDataContext)
    return (
        <div className="note" key={note._id} onClick={() => { setSelectedNote(note) }} >
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <NoteDelete noteId={note._id}/>
        </div>
    )
}

export default Note
