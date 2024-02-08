import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from './Component/Navbar.js';
import Home from './Component/Home.js';
import Register from './Component/Register.js';
import Edit from './Component/Edit.js';
import Details from './Component/Details.js';
// import{ BrowserRouter as Router, Switch,Route, Link} from "react-router-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
 

function App() {
  return (
    <div className="App">
      <Navbar /> 
      <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/edit/:id" Component={Edit} />
        <Route exact path="/view/:id" Component={Details} />
        </Routes>
      </Router>
      {/* <Home />
      <Register /> */}
    </div>
  );
}

export default App;
 