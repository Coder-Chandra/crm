import { useEffect } from "react";
import React from "react";
import Sidebar from "../components/Sidebar";
import { fetchTicket } from "../api/tickets";
import MaterialTable, { column } from "@material-table/core";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

const lookup = { true: "Available", false: "Unavailable" };

const columns = [
  { title: "ID", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "DESCRIPTION", field: "description" },
  { title: "REPORTER", field: "reporter" },
  { title: "ASSIGNEE", field: "assignee" },
  { title: "PRIORITY", field: "priority" },
  { title: "STATUS", field: "status", 
lookup : {
  "OPEN" : "OPEN",
  "IN_PROGRESS" : "IN_PROGRESS",
  "CLOSED" : "CLOSED",
  "BLOCKED" : "BLOCKED"}
 }
 ];

 const userColumns = [
  { title: "ID", field: "id" },
  { title: "NAME", field: "name" },
  { title: "EMAIL", field: "email" },
  { title: "ROLE", field: "userTypes" },
  { title: "STATUS", field: "status" },
 ];

const data = [
  { firstName: "Tod", lastName: "Miles", birthYear: 1987, availability: true },
  {
    firstName: "Jess",
    lastName: "Smith",
    birthYear: 2000,
    availability: false,
  },
];

// export const App = () => <MaterialTable columns={columns} data={data} />;

function Admin() {
  
  return (
    <div className="bg-light m-5 p-5 vh-100">
      <Sidebar />
      <div className="container p-5">
        <h3 className="text-center text-danger">Welcome {localStorage.getItem("name")} !</h3>
        <p className="text-muted text-center">
          Take a quick look at your admin stats below
        </p>
      </div>
      {/* widget start */}
      <div className="row ms-5 ps-2">
        <div className="col-xs-2 col-lg-3 col-md-6">
          <div
            className="card-shadow bg-primary bg-opacity-75 text-center"
            style={{
              width: 15 + "rem",
            }}
          >
            <h5 className="card-subtitle my-2 text-primary">
              <i className="bi bi-envelope-open text-primary mx-2"></i>
              OPEN
            </h5>
            <hr />
            <div className="row mb-2">
              <div className="col text-white mx-4 fw-bolder display-6">8</div>
              <div className="cd">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={8}
                    style={buildStyles({ pathColor: "darkblue" })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* widget 2 */}
        <div className="col-xs-2 col-lg-3 col-md-6">
          <div
            className="card-shadow bg-warning bg-opacity-75 text-center"
            style={{
              width: 15 + "rem",
            }}
          >
            <h5 className="card-subtitle my-2 text-primary">
              <i className="bi bi-envelope-open text-primary mx-2"></i>
              PROGRESS
            </h5>
            <hr />
            <div className="row mb-2">
              <div className="col text-white mx-4 fw-bolder display-6">20</div>
              <div className="cd">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={20}
                    style={buildStyles({ pathColor: "darkgolden" })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Widget 3 */}
        <div className="col-xs-2 col-lg-3 col-md-6">
          <div
            className="card-shadow bg-success bg-opacity-75 text-center"
            style={{
              width: 15 + "rem",
            }}
          >
            <h5 className="card-subtitle my-2 text-primary">
              <i className="bi bi-envelope-open text-primary mx-2"></i>
              CLOSED
            </h5>
            <hr />
            <div className="row mb-2">
              <div className="col text-white mx-4 fw-bolder display-6">75</div>
              <div className="cd">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={75}
                    style={buildStyles({ pathColor: "darkgreen" })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* widget 4 */}
        <div className="col-xs-2 col-lg-3 col-md-6">
          <div
            className="card-shadow bg-success bg-opacity-75 text-center"
            style={{
              width: 15 + "rem",
            }}
          >
            <h5 className="card-subtitle my-2 text-primary">
              <i className="bi bi-envelope-open text-primary mx-2"></i>
              BLOCKED
            </h5>
            <hr />
            <div className="row mb-2">
              <div className="col text-white mx-4 fw-bolder display-6">36</div>
              <div className="cd">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={36}
                    style={buildStyles({ pathColor: "darkgray" })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <div className="container" >
      <MaterialTable 
      title="Ticket Details"
      columns={columns}
      options = {{filtering : true,
        exportMenu : [{
            label : "Export Pdf",
            exportFunc : ( cols, data) => ExportPdf(cols, data, "userRecords")
          },
          {
            label : "Export Csv",
            exportFunc : ( cols, data) => ExportCsv(cols, data, "userRecords")
          }],
      headerStyle : {
        backgroundColor : "#d9534f",
        color : "#fff"},
        rowStyle : {
          backgroundColor : "eee"}
      }}
      //  data={data}
        />
      </div>
      <hr />
      <div className="container" >
      <MaterialTable 
      title="User Details"
      columns={userColumns}
      options = {{filtering : true,
      headerStyle : {
        backgroundColor : "#d9534f",
        color : "#fff"},
        rowStyle : {
          backgroundColor : "eee"}
      }}
      //  data={data} 
      />
      </div>
    </div>
  );
}

export default Admin;
