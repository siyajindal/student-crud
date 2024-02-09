import React, {  useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
 
export default function Register() {
 
    const navigate = useNavigate();

  const[inpval,setval]=useState({
    roll:"",
    name:"",
    classes:"",
    enrol:"",
    fees:"",
    mail:"",
    intro:""
  })

  const setdata =(e)=>{
    console.log(e.target.value);
    const {name,value}=e.target;
    setval((preval)=>{
        return{
            ...preval,
            [name]:value
        }
    })
  }   

  const addinpdata = async (e) => {
    e.preventDefault();

    const { roll,name,classes,enrol,fees,mail,intro } = inpval;
    // const res = await fetch('https://dummyjson.com/products/1');   
    // return res.json();
    const res = await fetch("http://localhost:8003/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            roll,name,classes,enrol,fees,mail,intro
        })   
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
        console.log("error ");
        alert("error");

    } else {
        alert("data added");
        navigate("/");
      console.log("data added");

     }
}
   

  return (
    <div className="container">
    
    <button className=' btn btn-info mt-5'><Link to='/'>Home</Link></button>
    <form className="mt-4">
    <div className='container'>
        <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="exampleInputEmail1" className="form-label">Student ID</label>
                <input type="number" value={inpval.roll} onChange={setdata} name="roll" className="form-control" id="exampleInputid"  />
                
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                <input type="text" value={inpval.name} onChange={setdata} name="name"  className="form-control" id="exampleInputPassword1"/>
            </div>
        </div>
        <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">Class</label>
                <input type="text" value={inpval.classes} onChange={setdata} name="classes" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label   className="form-label">Enrollment Date</label>
                <input type="date" value={inpval.enrol} onChange={setdata} name="enrol" className="form-control" />
            </div>
        </div>
        <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">Fee Status</label>
                <input type="text" value={inpval.fees} onChange={setdata} name="fees" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                <input type="mail" value={inpval.mail} onChange={setdata} name="mail" className="form-control" id="exampleInputPassword1"/>
            </div>
        </div>
        <div className="row">
            <div className="mb-3 col-lg-12 col-md-12 col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">Introduce Yourself</label>
                <textarea type="text" value={inpval.intro} onChange={setdata} name="intro" className='form-control' id="" cols="30" rows="5"></textarea>
            </div>
        </div>
        {/* <div id="emailHelp" className="form-text mb-3">We'll never share your data with anyone else.</div> */}
        <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
    </div>
</form>

    </div>
  )
}
 