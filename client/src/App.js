import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
 
import Home from './Component/Home.js';
import Register from './Component/Register.js';
import Edit from './Component/Edit.js';
import Details from './Component/Details.js';
import Stattable from './Component/Stattable.js';


import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useState } from 'react';
import DataProvider from './Context/DataProvider.js';
import Login from './Component/Login.js';
  

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
    
      <Outlet/>
    </> : <Navigate replace to='/account' />
};



function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    
    <DataProvider>  
    <BrowserRouter>
    <div className="App">
     
      <Routes>
      <Route path='/account' element=
      {<Login isUserAuthenticated={isUserAuthenticated} />} />

        <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
        </Route>

        <Route path='/register' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/register' element={<Register />} />
        </Route>

        <Route path='/edit/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/edit/:id' element={<Edit />} />
        </Route>

        <Route path='/view/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/view/:id' element={<Details />} />
        </Route>
        <Route path='/stattable' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/stattable' element={<Stattable />} />
        </Route>

        
        </Routes>
     
    </div>
    </BrowserRouter>
    
    </DataProvider>
  );
}

export default App;
 