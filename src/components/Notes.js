import React, { useContext } from 'react'
import NotesContext from '../context/notes/NotesContext'
import NoteItem from './NoteItem';

export default function Notes() {
    const context = useContext(NotesContext)
    const { notes, setNotes } = context;
    return (
        <div className="row mx-5 my-3">
            <h2>Your Notes</h2>
            {
            notes.map((note) => {
                return <NoteItem note={note}/>
            })
            }
        </div>
    )
}
