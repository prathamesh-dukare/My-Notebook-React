import { useRef,useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Css for the App
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Components from the App
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
// import Footer from "./components/Footer";

function App() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const notify = () => toast(alertMessage,{position: toast.POSITION.TOP_CENTER,type:alertType, autoClose: 3000});
  const alertRef= useRef(null);
  //TODO:Dark Mode+ Dark Alerts
  //TODO:User Profile
  //TODO:About Page
  return (
    <div className="App">
      <NoteState>
        <Router>
          <NavBar />
          <div>
                <button ref={alertRef} onClick={notify}  style={{display:"none"}}></button>
                <ToastContainer />
          </div>
          <Switch>
            <Route exact path="/">
              <Home alertRef={alertRef} setAlertMessage={setAlertMessage} setAlertType={setAlertType} />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login alertRef={alertRef} setAlertMessage={setAlertMessage} setAlertType={setAlertType}/>
            </Route>
            <Route exact path="/signup">
              <SignUp alertRef={alertRef} setAlertMessage={setAlertMessage} setAlertType={setAlertType}/>
            </Route>
          </Switch>
        </Router>
      </NoteState>
      {/* <Footer /> */}
    </div>
  );
}
export default App;