import React, { useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function Details() {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { id } = useParams("");

  console.log(id);

  const navigate = useNavigate();

  const getdata = async () => {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } 
    else {
      setUserdata(data);
      console.log("Get added");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      alert("user deleted");

      navigate("/");
    }
  };

  return (
    <>
      <div className="container mt-3">
        <h1 className="mt-2 mb-5" style={{ fontWeight: 350 }}>
          Welcome {getuserdata.name}
        </h1>
        <Card sx={{ minWidth: 600 }}>
          <CardContent>
            <div className="row">
              <div className="left_view col-lg-6 col-md-6 col-12">
                <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                <h5 className="mt-3">
                  Student ID: <span>{getuserdata.roll}</span>
                </h5>
                <h5 className="mt-3">
                  Name: <span>{getuserdata.name}</span>
                </h5>
                <p className="mt-3">
                  <EmailIcon /> Email: <span>{getuserdata.mail}</span>
                </p>
                <p className="mt-3">
                  <SchoolIcon /> Class: <span>{getuserdata.classes}</span>
                </p>
              </div>

              <div className="right_view col-lg-6 col-md-6 col-12">
                <div className="add_btn">
                  <Link to={`/edit/${getuserdata._id}`}>
                    {" "}
                    <button className="btn btn-primary mx-4">
                      <CreateIcon />
                    </button>{" "}
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteuser(getuserdata._id)}
                  >
                    <DeleteOutlineIcon />
                  </button>
                </div>
                <p className="mt-5">
                  <CalendarTodayIcon />
                  Enrollment: <span>{getuserdata.enrol? getuserdata.enrol.substring(0, 10):"" }</span>
                </p>
                <p className="mt-3">
                  <AccountBalanceIcon />
                  Fees Status: <span>{getuserdata.fees}</span>
                </p>
                <p className="mt-3">
                  Description: <span>{getuserdata.intro}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <button className="mt-5 mx-5 mb-10">
         <button className="btn btn-light"> <Link to="/">Home</Link> </button>
        </button>
      </div>
    </>
  );
}
