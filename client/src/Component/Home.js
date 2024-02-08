import React ,{useState} from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {NavLink} from "react-router-dom";
import { useEffect } from 'react';

export default function Add() {
  
const [getuserdata, setUserdata] = useState([]);
console.log(getuserdata);

  const getdata = async () => {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        } 
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
        console.log("error ");
         

    } else {
      setUserdata(data)
        console.log("Get added");

     }
}
   
useEffect(() => {
  getdata();
}, [])
 

  return (
    <div className='mt-5'>
       <div className='container'>
        <div className='add-btn mt-2 mb-2'>
          <NavLink to="/register" className='btn btn-primary'>Add Data</NavLink>
        </div>
        <table className="table table-striped table-hover">
  <thead>
    <tr className="table-dark">
      <th scope="col">Student ID</th>
      <th scope="col">Name</th>
      <th scope="col">Class</th>
      <th scope="col">Enrollment Date</th>
      <th scope="col">Fee Status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody >
  {
    getuserdata.map((element, id) => {
   return (
       <>
       <tr>
      <th scope="row">{element.roll}</th>
      <td>{element.name}</td>
      <td>{element.classes}</td>
      <td>{element.enrol}</td>
      <td>{element.fees}</td>
      <td className="d-flex justify-content-between">
      <NavLink to={`view/${element._id}`}> <button className='btn btn-success'> <RemoveRedEyeIcon /></button></NavLink> 
      <NavLink to={`edit/${element._id}`}> <button className='btn btn-primary'><CreateIcon /></button> </NavLink> 
        <button className='btn btn-danger'><DeleteOutlineIcon /></button>
      </td>
    </tr>
       </>
   )        })
   }

    
     
  </tbody>
</table>
       </div>
    </div>
  )
}

