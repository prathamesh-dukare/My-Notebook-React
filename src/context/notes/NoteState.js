import NotesContext from "./NotesContext";
import { useState } from "react";

const NotesState = (props) => {
    const host = process.env.REACT_APP_API_HOST_NAME

    const fetchAllNotes = async () => {
        setLoadingStatus(true)
        const response = await fetch(`${host}/api/notes/getallnotes`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        });
        const jsonData = await response.json()
        setNotes(jsonData)
        setLoadingStatus(false)
    }

    const addNote = async ({ title, description, tags }) => {
        const response = await fetch(`${host}/api/notes/createnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            }, body: JSON.stringify({ title, description, tags })
        });
        // addding a note for client side
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    const deleteNote = async (id) => {
        // Delete in client 
        const newNotes = notes.filter(note => note._id !== id)
        setNotes(newNotes)
        // Delete in server 
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            }
        });
        
    }

    const editNote = async (id, title, description, tags) => {
         // editing a note for client side
         let newNotes = JSON.parse(JSON.stringify(notes))
         for(let i=0;i<newNotes.length;i++){
             let tempNote = newNotes[i]
             if(id===tempNote._id){
                 tempNote.title = title
                 tempNote.description = description
                 tempNote.tags = tags
             }
             setNotes(newNotes)
         } 
         // editing a note for server side
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            }, body: JSON.stringify({ title, description, tags })
        });
    }

    const [notes, setNotes] = useState([])
    const [loadingStatus, setLoadingStatus] = useState(false)
    return (
        <NotesContext.Provider value={{ notes, setNotes,loadingStatus, fetchAllNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NotesContext.Provider>
    )
}
export default NotesState;