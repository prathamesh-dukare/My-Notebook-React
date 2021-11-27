import React, { useContext } from 'react'
import NotesContext from '../context/notes/NotesContext'

export default function NoteItem(props) {
    const { deleteNote } = useContext(NotesContext)
    const { note, updateNote,alertRef ,setAlertMessage ,setAlertType } = props;
    const updateNoteHandler = () => {
        updateNote(note)
    }
    const deleteNoteHandler = () => {
        setAlertType('error')
        setAlertMessage('Note Deleted')
        deleteNote(note._id)
        setTimeout(() => {
            alertRef.current.click()
        }, 280);
    }
    return (
        <div className="card border-info mb-2 col-md-4 row mx-3" style={{ maxWidth: "18rem" }}>
            <div className="d-flex" style={{ justifyContent: "space-around", alignItems: "center" }} >
                <div className="card-header">{note.title}</div>
                <div className="h" style={{ position: "absolute", right: "5px" }} >
                    <i className="fas fa-edit" style={{ color: "#239c14" }} onClick={updateNoteHandler}></i>
                    <i className="fas fa-trash-alt" style={{ color: "#de4444" }} onClick={deleteNoteHandler}></i>
                </div>
            </div>
            <div className="card-body" style={{ padding: "0.3rem" }}>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    )
}
