 import React, { useEffect, useState } from 'react';
 import { Link } from "react-router-dom";

export default function Stattable() {
  
  const [unpaidStudentList , setunpaidStudentList] = useState([]);
  
  const setData = async ()=>{
    const res = await fetch("http://localhost:8003/stattable");
    const data = await res.json();

    setunpaidStudentList(data);
    console.log(data);

  }
  

  useEffect(()=>{
     setData();
  } , []);

  return (
    <div>
      <h1 className=' mb-5 mt-5 mx-5 status'>Students with Unpaid Fees</h1>
      {/* mb-5 mt-5 mx-5 */}
      <div className='row container mx-auto '>
      <table className="table mx-auto table-striped table-hover">
        <thead>
          <tr className="table-dark">
            <th scope="col">Student ID</th>
            <th scope="col">Name</th>  
            <th scope="col">Class</th>
            <th scope="col">Fee Status</th>
          </tr>
        </thead>
        <tbody>
          {unpaidStudentList.map((student) => (
            <tr key={student._id}>
              <td>{student.roll}</td> 
              <td>{student.name}</td>
              <td>{student.classes}</td>
              <td>{student.fees}</td>
            </tr>
          ))}
        </tbody>
      </table> 
    
      </div>
         
    </div>
  );
}


 
 