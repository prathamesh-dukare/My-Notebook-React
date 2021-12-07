import React from 'react'

export default function Spinner() {
        return (
            <div className="d-flex justify-content-center" style={{}}>
                <div className="spinner-grow" style={{ height: "2.3rem", width: "2.3rem",margin:"0 auto",display:"block" }} role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        )
}
