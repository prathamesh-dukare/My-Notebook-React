import React from 'react'
import logo from "./header-banner.svg"

export default function About() {
    return (
        <div className="d-flex" style={{ marginTop: "4rem" }}>
            <div className="header">
                <img src={logo} alt="Header" />
            </div>
            <div className="header-info" style={{fontSize:"18px",marginTop:"1rem"}}>
                <h1>My Notebook</h1>
                <p>
                    This is a simple note taking app which allows you to create, edit and delete notes.
                </p>
                <h3>Features of the App</h3>
                <ul>
                    <li>All Notes at one place</li>
                    <li>Editable Notes</li>
                    <li>Saved on cloud</li>
                    <li>Search by Tags</li>
                </ul>
                <div className="d-flex" style={{ flexDirection: "column" }}>
                    <span>© Copyright All Rights Reserved 2021</span>
                    <span>Made with 💖 &amp; React by <a href="https://linktr.ee/prathameshdukare" rel="noreferrer" target="_blank">Prathamesh</a></span>
                </div>
            </div>
        </div>
    )
}
