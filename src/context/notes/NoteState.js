import NotesContext from "./NotesContext";
import { useState } from "react";

const NotesState = (props) => {
    const host = 'http://localhost:5000/'
    const initialNotes = []

    const fetchAllNotes = async () => {
        const response = await fetch(`${host}api/notes/getallnotes`,{
            method:"GET",
            headers:{
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhMDg2NzhlMjEwODg5Yzg0NjU5OTk5In0sImlhdCI6MTYzNzkxMDEzN30.5mjgEkSa8J7mfgpPEXr4AEDkN75sB1ZRQA6HTk9TvuI"
            }
        });
        const jsonData = await response.json()
        console.log(jsonData);
        setNotes(jsonData)
    }

    const addNote = async ({title,description,tags}) => {
        // API Call 
        await fetch(`${host}api/notes/createnote`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhMDg2NzhlMjEwODg5Yzg0NjU5OTk5In0sImlhdCI6MTYzNzkxMDEzN30.5mjgEkSa8J7mfgpPEXr4AEDkN75sB1ZRQA6HTk9TvuI"
            },body:JSON.stringify({title,description,tags})
        });
        fetchAllNotes()
        // // addding a note 
        // let tempNote = {
        //     "_id": `619c89a1dd67692f4ef04bc${title[0]}`,
        //     "user": "619c778db074af59a1b01177",
        //     "title": title,
        //     "description": description,
        //     "tags": tags,
        //     "__v": 0
        // }
        // setNotes(notes.concat(tempNote))
    }

    const deleteNote = async (id) => {
        await fetch(`${host}api/notes/deletenote/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhMDg2NzhlMjEwODg5Yzg0NjU5OTk5In0sImlhdCI6MTYzNzkxMDEzN30.5mjgEkSa8J7mfgpPEXr4AEDkN75sB1ZRQA6HTk9TvuI"
            }
        });
        fetchAllNotes()
        // // deleting a note  
        // const filteredNotes = notes.filter((tempNote) => {
        //     return tempNote._id !== id
        // })
        // setNotes(filteredNotes)
    }
    const editNote = async (id,title,description,tags)=>{
        // console.log(id,title,description,tags,"from data");
        // API Call 
        await fetch(`${host}api/notes/updatenote/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhMDg2NzhlMjEwODg5Yzg0NjU5OTk5In0sImlhdCI6MTYzNzkxMDEzN30.5mjgEkSa8J7mfgpPEXr4AEDkN75sB1ZRQA6HTk9TvuI"
            },body:JSON.stringify({title,description,tags})
        });
        fetchAllNotes()
        // // editing a note 
        // for(let i=0;i<notes.length;i++){
        //     let tempNote = notes[i]
        //     if(id===tempNote._id){
        //         tempNote.title = title
        //         tempNote.description = description
        //         tempNote.tags = tags
        //     }
        // }
    }
    const [notes, setNotes] = useState(initialNotes)
    return (
        <NotesContext.Provider value={{ notes, setNotes,fetchAllNotes, addNote, deleteNote,editNote }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesState;