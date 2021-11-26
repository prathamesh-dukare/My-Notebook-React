import React, { useContext, useState,useRef } from 'react'
import Notes from './Notes'
import NotesContext from '../context/notes/NotesContext'

export default function HomeNotes() {
    const { addNote } = useContext(NotesContext)
    const [currentNote, setCurrentNote] = useState({ title: "", description: "", tags: "Default" })
    const addNoteHandler = (e) => {
        e.preventDefault()
        addNote(currentNote)
        setCurrentNote({ title: "", description: "", tags: "Default" })
        refReset.current.click()
    }
    const refReset = useRef(null)
    const onChange = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-3">
                <form className="container my-5" style={{ width: "55vw" }}>
                    <h2 style={{ marginTop: "2em" }}>Create a New Note</h2>
                    <div className="form-group my-2">
                        <input type="text" className="form-control" onChange={onChange} id="title" name="title" placeholder="Note Title" />
                    </div>
                    <div className="form-group my-2">
                        <textarea className="form-control" onChange={onChange} id="description" name="description" placeholder="Enter the Notes Details here....." rows="3"></textarea>
                    </div>
                    <div className="form-group my-2">
                        <input type="text" className="form-control" onChange={onChange} id="tags" name="tags" placeholder="Tags Goes here (comma seperated) [optional]" />
                    </div>
                    <div className="container my-2 flex-container text-center">
                        <button className="btn btn-outline btn-success mx-2 my-1" disabled={currentNote.title.length===0 || currentNote.description.length===0 } onClick={addNoteHandler} type="submit">Add a Note</button>
                        <button className="btn btn-outline btn-danger mx-2 my-1" disabled={currentNote.title.length===0 && currentNote.description.length===0 && currentNote.tags.length===0 } ref={refReset} type="reset">Reset Details</button>
                    </div>
                </form>
                <Notes />

            </div>
        </div>
    )
}
