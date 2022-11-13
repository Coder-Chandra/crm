import React from "react";
import Sidebar from "../components/Sidebar";
import MaterialTable, { Column } from "@material-table/core";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const lookup = { true: "Available", false: "Unavailable" };

const columns = [
  { title: "First Name", field: "firstName" },
  { title: "Last Name", field: "lastName" },
  { title: "Birth Year", field: "birthYear", type: "numeric" },
  { title: "Availablity", field: "availability", lookup }
];

const data = [
  { firstName: "Tod", lastName: "Miles", birthYear: 1987, availability: true },
  { firstName: "Jess", lastName: "Smith", birthYear: 2000, availability: false }
];

// export const App = () => <MaterialTable columns={columns} data={data} />;

function Admin (){
    return(
        <div className="bg-light m-5 p-5 vh-100">
        <Sidebar />
        <div className="container p-5">
          <h3 className="text-center text-danger">Welcome Admin !</h3>
          <p className="text-muted text-center">Take a quick look at your admin stats below</p>
        </div>
         {/* widget start */}
        <div className="row mx-5 mb-2">
          <div className="col-xs-12 col-lg-3 col-md-6 m-1">
            <div className="card-shadow bg-primary bg-opacity-50 text-center" style={{
              width:15 +'rem'}}>
                <h5 className="card-subtitle my-2 text-primary">
                  <i className="bi bi-invelope-open text-primary mx-2"></i>
                  Open
                </h5>
                <hr />
                <div className="row mb-2">
                  <div className="col text-white mx-4 fw-bolder display-6">
                    8
                  </div>
                  <div className="cd">
                  <div style={{width:40, height:40}}>
                  <CircularProgressbar value={8} style={buildStyles({pathColor:"darkblue"})} />
                  </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
            <MaterialTable title="Demo Title" columns={columns} data={data} />
        </div>
    )
}

export default Admin;