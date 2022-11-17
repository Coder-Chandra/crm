import { useEffect, useState, React } from "react";
import Sidebar from "../components/Sidebar";
import { fetchTicket, ticketUpdation } from "../api/tickets";
import {Modal, Button, ModalFooter} from 'react-bootstrap';
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
  const [ticketDetails, setTicketDetails] = useState([]);
  const [ticketStatusCount, setTicketStatusCount] = useState({});
  const [ticketUpdationModal, setTicketUpdationModal] = useState(false);
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  const openTicketUpdationModal = () => setTicketUpdationModal(true);
  const closeTicketUpdationModal = () => setTicketUpdationModal(false);

  useEffect(() => {
    fetchTickets()
  }, []);

  const updateTicketCount = (tickets) => {
    // filling this empty object with the ticket counts
    // Segrating the tickets in 4 properties according to the status of the tickets
    const data = {
      open: 0,
      closed: 0,
      progress: 0,
      blocked: 0,
    };

    tickets.forEach((x) => {
      if (x.status === "OPEN") {
        data.open += 1;
      } else if (x.status === "CLOSED") {
        data.closed += 1;
      } else if (x.status === "IN_PROGRESS") {
        data.progress += 1;
      } else {
        data.blocked += 1;
      }
    });

    setTicketStatusCount(Object.assign({}, data));
  };

  const fetchTickets = () => {
    fetchTicket()
      .then((response) => {
        setTicketDetails(response.data);
        updateTicketCount(response.data);
      }).catch (function (error){
      console.log(error);
    })
    setTicketStatusCount(Object.assign({},data))
  }
  const editTicket = (ticketDetail) =>{
    const ticket ={
      assiginee : ticketDetail.assiginee,
      description : ticketDetail.description,
      title : ticketDetail.title,
      id : ticketDetail.id,
      reporter : ticketDetail.reporter,
      status : ticketDetail.status,
      ticketPriority : ticketDetail.ticketPriority
    }
    setTicketUpdationModal(true)
    setSelectedCurrTicket(ticket)
  }

  const onTicketUpdate = () => {
    
  }
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
              <div className="col text-white mx-4 fw-bolder display-6">{ticketStatusCount.open}</div>
              <div className="cd">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={ticketStatusCount.open}
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
              <i className="bi bi-hourglass-split text-primary mx-2"></i>
              PROGRESS
            </h5>
            <hr />
            <div className="row mb-2">
              <div className="col text-white mx-4 fw-bolder display-6">{ticketStatusCount.progress}</div>
              <div className="cd">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={ticketStatusCount.progress}
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
              <i className="bi bi-check2-circle text-primary mx-2"></i>
              CLOSED
            </h5>
            <hr />
            <div className="row mb-2">
              <div className="col text-white mx-4 fw-bolder display-6">{ticketStatusCount.closed}</div>
              <div className="cd">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={ticketStatusCount.closed}
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
            className="card-shadow bg-secondary bg-opacity-75 text-center"
            style={{
              width: 15 + "rem",
            }}
          >
            <h5 className="card-subtitle my-2 text-primary">
              <i className="bi bi-slash-circle text-primary mx-2"></i>
              BLOCKED
            </h5>
            <hr />
            <div className="row mb-2">
              <div className="col text-white mx-4 fw-bolder display-6">{ticketStatusCount.blocked}</div>
              <div className="cd">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={ticketStatusCount.blocked}
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
          // 1. grabbing the specific ticket from the row
          // onRowClick={(event, rowData) => editTicket(rowData)}
          title="TICKET"
          columns={columns}
          data={ticketDetails}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#d9534f",
              color: "#fff",
            },
            rowStyle: {
              backgroundColor: "#eee",
            },

            exportMenu: [
              {
                label: "Export Pdf",
                exportFunc: (cols, data) =>
                  ExportPdf(cols, data, "ticketRecords"),
              },
              {
                label: "Export Csv",
                exportFunc: (cols, data) =>
                  ExportCsv(cols, data, "ticketRecords"),
              },
            ],
          }}
        />
        {ticketUpdationModal ? (
          <Modal
          show = {ticketUpdationModal}
          onHide = {closeTicketUpdationModal}
          backdrop = "static"
          centered>
            <Modal.Header closeButton>
              <Modal.Title>Update Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="p-1">
                  <h5 className="card-subtitle mb-2 text-danger">User Id : {selectedCurrTicket.id}</h5>
                </div>
                <div className="input-group mb-2">
                  <label className="lable input-group-text label-md">Title</label>
                  <input type="text" disabled value=  {selectedCurrTicket.title} className="form-control" />
                </div>
                <div className="input-group mb-2">
                  <label className="lable input-group-text label-md">Reporter</label>
                  <input type="text" disabled value=  {selectedCurrTicket.reporter} className="form-control" />
                </div>
                <div className="input-group mb-2">
                  <label className="lable input-group-text label-md" onChange={onTicketUpdate}>Assiginee</label>
                  <select name= {selectedCurrTicket.assiginee} className="form-control">
                    <option> {selectedCurrTicket.assiginee}</option>
                  </select>
                </div>
                <div className="input-group mb-2">
                  <label className="lable input-group-text label-md">Priority</label>
                  <input type="number" value= {selectedCurrTicket.ticketPriority} className="form-control" name="tecketPriority" onChange={onTicketUpdate} />
                  <select className="form-select" onChange={onTicketUpdate} name= {selectedCurrTicket.status}>
                    <option value="OPEN" >OPEN</option>
                    <option value="IN_PROGRESS" >IN_PROGRESS</option>
                    <option value="CLOSED" >CLOSED</option>
                    <option value="BLOCKED" >BLOCKED</option>
                  </select>
                </div>
                <div className="input-group mb-2">
                  <label className="lable input-group-text label-md">Description</label>
                  <textarea type="text" value= "Description" className="md-textarea form-control" rows="3" name = "description" onChange={onTicketUpdate} />
                </div>
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="m-1" onClick={() => closeTicketUpdationModal}>Cancel</Button>
                  <Button variant="danger" className="m-1" type="submit">Update</Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        ) : null}
        <hr />
      <MaterialTable 
      onRowClick={(event, rowdata) => editTicket(rowdata)}
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
