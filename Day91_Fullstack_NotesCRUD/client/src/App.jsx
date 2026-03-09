import { useState, useEffect } from 'react'
import './App.css'
import Note from './components/general/note-card-layout/Note'
import { useContext } from 'react'
import { NotesDataContext } from './context/NotesContext'
import NoteInput from './components/general/note-input/NoteInput'
import NoteModal from './components/general/note-modal/NoteModal'

function App() {
  const { notes, setNotes,selectedNote, setSelectedNote } = useContext(NotesDataContext)

  return (
    <main>
      <div className="note-input">
        <NoteInput />
      </div>
      {selectedNote && <NoteModal note={selectedNote} onClose={() => { setSelectedNote(null) }} />}

      <div className="notes">
        {notes.map((note) => (
          <Note note={note} key={note._id} />
        ))}
      </div>
    </main>
  )
}

export default App
