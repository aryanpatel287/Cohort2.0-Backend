import React, { useContext, useState } from 'react'
import { NotesDataContext } from '../../../context/NotesContext'
import api from '../../../api/axiosInstance'
import './note-input.css'

const NoteInput = () => {
    const { notes, setNotes, selectedNote, setSelectedNote, setNotesData } = useContext(NotesDataContext)
    const [titleInput, setTitleInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [inputState, setInputState] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        const { title, description } = e.target.elements

        api.post('/api/notes', {
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
                placeholder='Take a note...'
                value={titleInput}
                onFocus={(() => { setInputState(true) })}
                onChange={(e) => { setTitleInput(e.target.value) }}
            />
            <div className={inputState ? "bottom active" : "bottom"}>
                <textarea
                    type="text"
                    name="description"
                    className="description-input"
                    id="note-description"
                    value={descriptionInput}
                    rows={1}
                    onChange={(e) => { setDescriptionInput(e.target.value) }}
                    onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                ></textarea>
                <div className="form-buttons">
                    <button type="submit">Save</button>
                    <button type="reset" onClick={(() => { setInputState(false) })}>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default NoteInput