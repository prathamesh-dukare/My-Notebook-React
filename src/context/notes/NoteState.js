import NotesContext from "./NotesContext";
import { useState } from "react";

const NotesState = (props)=>{
    const initialNotes = [
        {
          "_id": "619c8990dd67692f4ef04bc8",
          "user": "619c778db074af59a1b01177",
          "title": "Test Noteq",
          "description": "a",
          "tags": "a",
          "__v": 0
        },
        {
          "_id": "619c89a1dd67692f4ef04bcb",
          "user": "619c778db074af59a1b01177",
          "title": "Test Noteq",
          "description": "a",
          "tags": "a",
          "__v": 0
        }
    ]
    const [notes, setNotes] = useState(initialNotes)
      return (
          <NotesContext.Provider value={{notes,setNotes}}>
            {props.children }   
        </NotesContext.Provider>
    )
}

export default NotesState;