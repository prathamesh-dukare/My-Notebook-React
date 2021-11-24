import React from 'react'
import Notes from './Notes'

export default function Home() {
    return (
        <>
            <form className="container my-5" style={{ width: "55vw" }}>
                <h2>Create a New Note</h2>
                <div className="form-group my-2">
                    <input type="text" className="form-control" id="htmlTitle" placeholder="Note Title" />
                </div>
                <div className="form-group my-2">
                    <textarea className="form-control" id="htmlDetails" placeholder="Enter the Notes Details here....." rows="3"></textarea>
                </div>
                <div className="form-group my-2">
                    <input type="text" className="form-control" id="htmlTags" placeholder="Tags Goes here" />
                </div>
                <div className="container my-2 flex-container">
                    <button className="btn btn-outline btn-success" type="submit">Add a Note</button>
                    <button className="btn btn-outline btn-danger" type="submit">Reset Details</button>
                </div>
            </form>  
            <Notes/>       
        </>
    )
}
