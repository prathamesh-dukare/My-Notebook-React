import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
// import Footer from "./components/Footer";
import NoteState from "./context/notes/NoteState";

function App() {
  return ( 
    <div className="App">
      <NoteState>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </Router>
      </NoteState>
      {/* <Footer /> */}
    </div>
  );
}
export default App;
