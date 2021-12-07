import NotesContext from "./NotesContext";
import { useState } from "react";

const NotesState = (props) => {
    const host = process.env.REACT_APP_API_HOST_NAME
    const initialNotes = []

    const fetchAllNotes = async () => {
        const response = await fetch(`${host}/api/notes/getallnotes`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        });
        const jsonData = await response.json()
        setNotes(jsonData)
    }

    const addNote = async ({ title, description, tags }) => {
        await fetch(`${host}/api/notes/createnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            }, body: JSON.stringify({ title, description, tags })
        });
        fetchAllNotes()
    }

    const deleteNote = async (id) => {
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            }
        });
        fetchAllNotes()
    }

    const editNote = async (id, title, description, tags) => {
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            }, body: JSON.stringify({ title, description, tags })
        });
        fetchAllNotes()
    }

    const [notes, setNotes] = useState(initialNotes)
    return (
        <NotesContext.Provider value={{ notes, setNotes, fetchAllNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NotesContext.Provider>
    )
}
export default NotesState;