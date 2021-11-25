import React from 'react'

export default function NoteItem(prop) {
    const note = prop.note
    return (
        <div className="card border-info mb-2 col-md-4 row mx-3" style={{ maxWidth: "18rem" }}>
            <div className="d-flex" style={{ justifyContent:"space-around",alignItems:"center" }} >
                <div className="card-header">{note.title}</div>
                <div className="h" style={{ position:"absolute",right:"5px" }} >
                    <i class="fas fa-edit" style={{color:"#239c14"}}></i>
                    <i class="fas fa-trash-alt" style={{color:"#de4444"}}></i>
                </div>
            </div>
            <div className="card-body" style={{ padding: "0.3rem" }}>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    )
}
