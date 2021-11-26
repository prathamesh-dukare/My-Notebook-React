import NotesContext from "./NotesContext";
import { useState } from "react";

const NotesState = (props) => {
    const host = 'http://localhost:5000/'
    const initialNotes = []

    const fetchAllNotes = async () => {
        const response = await fetch(`${host}api/notes/getallnotes`, {
            method: "GET",
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhMDg2NzhlMjEwODg5Yzg0NjU5OTk5In0sImlhdCI6MTYzNzkxMDEzN30.5mjgEkSa8J7mfgpPEXr4AEDkN75sB1ZRQA6HTk9TvuI"
            }
        });
        const jsonData = await response.json()
        setNotes(jsonData)
    }

    const addNote = async ({ title, description, tags }) => {
        await fetch(`${host}api/notes/createnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhMDg2NzhlMjEwODg5Yzg0NjU5OTk5In0sImlhdCI6MTYzNzkxMDEzN30.5mjgEkSa8J7mfgpPEXr4AEDkN75sB1ZRQA6HTk9TvuI"
            }, body: JSON.stringify({ title, description, tags })
        });
        fetchAllNotes()
    }

    const deleteNote = async (id) => {
        await fetch(`${host}api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhMDg2NzhlMjEwODg5Yzg0NjU5OTk5In0sImlhdCI6MTYzNzkxMDEzN30.5mjgEkSa8J7mfgpPEXr4AEDkN75sB1ZRQA6HTk9TvuI"
            }
        });
        fetchAllNotes()
    }

    const editNote = async (id, title, description, tags) => {
        await fetch(`${host}api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhMDg2NzhlMjEwODg5Yzg0NjU5OTk5In0sImlhdCI6MTYzNzkxMDEzN30.5mjgEkSa8J7mfgpPEXr4AEDkN75sB1ZRQA6HTk9TvuI"
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