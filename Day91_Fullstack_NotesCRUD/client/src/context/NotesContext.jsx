import React, { useEffect, useState, createContext } from 'react'
import fetchNotes from '../api/NotesApi'

export const NotesDataContext = createContext()

const NotesContext = ({ children }) => {

    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState()

    const setNotesData = async () => {
        setNotes(await fetchNotes())
    }

    useEffect(() => {
        setNotesData()
    }, [])

    return (
        <NotesDataContext.Provider value={{ notes, setNotes, selectedNote, setSelectedNote,setNotesData }}>
            {children}
        </NotesDataContext.Provider>
    )
}

export default NotesContext
