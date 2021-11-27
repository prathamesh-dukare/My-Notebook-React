import React from 'react'
import HomeNotes from './HomeNotes'

export default function Home(props) {
    const  {alertRef ,setAlertMessage ,setAlertType} = props;
    return (
       <HomeNotes alertRef={alertRef} setAlertMessage={setAlertMessage} setAlertType={setAlertType}/> 
    )
}
