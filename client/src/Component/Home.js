import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Add() {
  const [getuserdata, setUserdata] = useState([]);
  const [pendingFeeData, setPendingFeeData] = useState([]);
  const navigate = useNavigate();
  console.log(getuserdata);

  const getdata = async () => {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
      console.log("Get added");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleClick = () => {
    navigate("/stattable");
  };

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
      getdata();
    }
  };

  return (
    <>
      <div className="mt-5">
        <div className="container">
          <div className="add-btn mt-2 mb-2">
            <button onClick={handleClick} className="btn btn-primary my-4 mx-4">
              Status
            </button>

            <Link to="/register" className="btn btn-primary">
              Add Data
            </Link>
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
            <tbody>
              {getuserdata.map((element, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{element.roll}</th>
                      <td>{element.name}</td>
                      <td>{element.classes}</td>
                      <td>{element?.enrol.substring(0, 10)}</td>
                      <td>{element.fees}</td>
                      <td className="d-flex justify-content-between">
                        <Link to={`view/${element._id}`}>
                          {" "}
                          <button className="btn btn-success">
                            {" "}
                            <RemoveRedEyeIcon />
                          </button>
                        </Link>
                        <Link to={`edit/${element._id}`}>
                          {" "}
                          <button className="btn btn-primary">
                            <CreateIcon />
                          </button>{" "}
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteuser(element._id)}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
