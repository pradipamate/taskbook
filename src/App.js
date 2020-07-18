import React, { Component } from "react";
import ReactDom from "react-dom";
import uuid from "uuid";
import {
  Add,
  RemoveItemFromList,
  updated,
  ChangeStatus,
} from "./practice/actions/TaskbookAction";
import {
  Col,
  Button,
  Container,
  Row,
  Form,
  variant,
  Modal,
  Table,
} from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "font-awesome/css/font-awesome.min.css";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: null,
      Description: null,
      Duedate: null,
      Priority: null,
      MyDisplayData: null,
      Completedtask: null,

      editid: null,
      updatedTitle: null,
      updatedDescription: null,
      updatedDuedate: null,
      updatedPriority: null,
      viewTitle: null,
      viewdDescription: null,
      viewDuedate: null,
      viewPriority: null,

      show: false,
      Addtaskmodal: false,
      Edittaskmodal: false,
      Viewtaskmodal: false,
      Deletetaskmodal: false,
      Deletetaskid: null,
    };

    this.submithandler = this.submithandler.bind(this);
    this.DeleteTaskhandler = this.DeleteTaskhandler.bind(this);
    this.DeleteModalhandler = this.DeleteModalhandler.bind(this);
    this.Edithandler = this.Edithandler.bind(this);
    this.CompleteTaskhandler = this.CompleteTaskhandler.bind(this);
    this.AddInfoHandler = this.AddInfoHandler.bind(this);
    this.modalClosehandle = this.modalClosehandle.bind(this);
    this.SearchTaskhnadler = this.SearchTaskhnadler.bind(this);
    this.GroupSearchchangehandler = this.GroupSearchchangehandler.bind(this);
    this.SortTaskhandler = this.SortTaskhandler.bind(this);
    this.Taskdataview = this.Taskdataview.bind(this);
  }

  AddInfoHandler = () => {
    this.setState({
      Addtaskmodal: true,
    });
  };

  modalClosehandle = (event) => {
    this.setState({
      Addtaskmodal: false,
      Deletetaskmodal: false,
      Edittaskmodal: false,
      Viewtaskmodal: false,
    });
  };

  // for add task handler//
  Titlechangehandler = (event) => {
    this.setState({
      Title: event.target.value,
    });
  };
  Descriptionchangehandler = (event) => {
    this.setState({
      Description: event.target.value,
    });
  };
  Duedatechangehandler = (event) => {
    this.setState({
      Duedate: event.target.value,
    });
  };

  Prioritychangehandler = (event) => {
    this.setState({
      Priority: event.target.value,
    });
  };

  //  updates change handler
  UpdateTitlechangehandler = (event) => {
    this.setState({
      updatedTitle: event.target.value,
    });
  };
  UpdateDescriptionchangehandler = (event) => {
    console.log(event.target.value);
    this.setState({
      updatedDescription: event.target.value,
    });
  };

  UpdateDuedatechangehandler = (event) => {
    // console.log(event.target.value);
    this.setState({
      updatedDuedate: event.target.value,
    });
  };

  UpdatePrioritychangehandler = (event) => {
    // console.log(event.target.value);
    this.setState({
      updatedPriority: event.target.value,
    });
  };

  // for add value
  submithandler = (event) => {
    event.preventDefault();
    this.setState({
      Addtaskmodal: false,
    });
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;

    if (
      this.state.Title !== null &&
      this.state.Description !== null &&
      this.state.Duedate !== null &&
      this.state.Priority !== null
    ) {
      if (this.state !== "") {
        var data = {};
        data.Title = this.state.Title;
        data.Description = this.state.Description;
        data.Duedate = this.state.Duedate;
        data.Priority = this.state.Priority;
        data.id = uuid.v4();
        data.CurrentState = "pending";
        data.CreatedAt = today;
        this.props.dispatch(Add(data));
        this.setState({
          Title: "",
          Description: "",
          Duedate: "",
          Priority: "",
        });
      }

      setTimeout(() => {
        var completedata = this.props.Listdata;
        var i;
        var revserdata = [];
        for (i = completedata.length - 1; i >= 0; i--) {
          revserdata.push(completedata[i]);
        }
        this.setState({ MyDisplayData: revserdata });
      }, 100);
    } else {
      alert("Please Fill All Information");
      return false;
    }
  };

  Edithandler = (event) => {
    var edit_id = event.target.id;
    const data = this.props.Listdata.find((item) => item.id === edit_id);
    this.setState({
      Edittaskmodal: true,
      editid: edit_id,
      updatedTitle: data.Title,
      updatedDescription: data.Description,
      updatedDuedate: data.Duedate,
      updatedPriority: data.Priority,
    });
  };

  updated_submithandler = (event) => {
    event.preventDefault();
    this.setState({
      Edittaskmodal: false,
    });
    if (this.state !== "") {
      var newdata = {};
      newdata.id = this.state.editid;
      newdata.Title = this.state.updatedTitle;
      newdata.Description = this.state.updatedDescription;
      newdata.Duedate = this.state.updatedDuedate;
      newdata.Priority = this.state.updatedPriority;
      this.props.dispatch(updated(newdata));
    }
  };

  //for remove single value
  DeleteModalhandler = (id) => {
    this.setState({
      Deletetaskmodal: true,
      Deletetaskid: id,
    });
  };

  DeleteTaskhandler = () => {
    this.props.dispatch(RemoveItemFromList(this.state.Deletetaskid));
    this.setState({
      MyDisplayData:this.props.Listdata,
      Deletetaskmodal: false,
    });
  };

  //for comlete status //
  CompleteTaskhandler = (event) => {
    var completedid = event.target.id;
    this.setState({
      Completedtask: "done",
    });
    this.props.dispatch(ChangeStatus(completedid));
  };

  SearchTaskhnadler = (event) => {
    var searchtext = event.target.value;
    if (searchtext !== "") {
      const newData = this.state.MyDisplayData.filter(function (item) {
        const itemData = item.Title
          ? item.Title.toUpperCase()
          : "".toUpperCase();
        const textData = searchtext.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        MyDisplayData: newData,
      });
    } else {
      var originalData = this.props.Listdata;
      this.setState({ MyDisplayData: originalData });
    }
  };

  // for GroupBySearch
  GroupSearchchangehandler = (event) => {
    var selectedvalue = event.target.value;

    if (selectedvalue == "none") {
      let MatcheData = this.props.Listdata.filter(function (obj) {
        for (var key in obj) {
          console.log("obj", obj[key]);
          if (obj[key].includes(selectedvalue)) {
            return obj;
          }
        }
      });
      this.setState({
        MyDisplayData: MatcheData,
      });
    }
     else if (selectedvalue == "Createdat") {
      let SortCreatedat = this.props.Listdata.sort(function (a, b) {
        var dateA = new Date(a.CreatedAt).getTime();
        var dateB = new Date(b.CreatedAt).getTime();
        return dateA > dateB ? 1 : -1;
      });
      this.setState({
        MyDisplayData: SortCreatedat,
      });
    } else if (selectedvalue === "pending") {
      let MatchDataPending = this.props.Listdata.filter(function (obj) {
        for (var key in obj) {
          if (obj[key].includes("pending")) {
            return obj;
          }
        }
      });
      let SortDuedata = this.props.Listdata.sort(function (a, b) {
        var dateA = new Date(a.Duedate).getTime();
        var dateB = new Date(b.Duedate).getTime();
        return dateA > dateB ? 1 : -1;
      });
      this.setState({
        MyDisplayData: SortDuedata,
      });
    } else {
      let MatchDataLow = this.props.Listdata.filter(function (obj) {
        for (var key in obj) {
          if (obj[key].includes("low")) {
            return obj;
          }
        }
      });
      let MatchDatamedium = this.props.Listdata.filter(function (obj) {
        for (var key in obj) {
          if (obj[key].includes("medium")) {
            return obj;
          }
        }
      });
      let MatchDatahigh = this.props.Listdata.filter(function (obj) {
        for (var key in obj) {
          if (obj[key].includes("high")) {
            return obj;
          }
        }
      });
      let MatchDatanone = this.props.Listdata.filter(function (obj) {
        for (var key in obj) {
          if (obj[key].includes("none")) {
            return obj;
          }
        }
      });

      var modifieddata = [
        ...MatchDataLow,
        ...MatchDatamedium,
        ...MatchDatahigh,
        ...MatchDatanone,
      ];
      this.setState({
        MyDisplayData: modifieddata,
      });
    }
  };

  SortTaskhandler = () => {
    var SortData = this.state.MyDisplayData.reverse();
    this.setState({ MyDisplayData: SortData });
  };
  Taskdataview = (id) => {
    var Requestviewdata = this.state.MyDisplayData.find((item) => item.id === id);
    this.setState({
      Viewtaskmodal: true,
      viewTitle: Requestviewdata.Title,
      viewdDescription: Requestviewdata.Description,
      viewDuedate: Requestviewdata.Duedate,
      viewPriority: Requestviewdata.Priority,
    });
  };

  render() {
    var AvailableData = this.state.MyDisplayData;
    //   console.log("InsideRenderdata",AvailableData);

    if (AvailableData !== null) {
      var AllTaskList = AvailableData.map((item) => (
        <tr key={item.id} className={item.CurrentState === "Done" ? "done" : ""}>
          <td className="Title" onClick={() => this.Taskdataview(item.id)}>
            {item.Title}
          </td>
          <td>{item.Priority}</td>
          <td>{item.CreatedAt}</td>
          <td>{item.Duedate}</td>
          <td>
            <Button variant="primary mr-2 ">
             <i className="fa fa-pencil-square-o"
                aria-hidden="true"
                id={item.id}
                onClick={this.Edithandler}
              ></i>
            </Button>

            {item.CurrentState == "pending" ? (
              <Button
                variant="success mr-2"
                id={item.id}
                onClick={this.CompleteTaskhandler}>
                Done
              </Button>
            ) : (
              <Button
                variant="secondary mr-2"
                className="Reopen-button"
                id={item.id}>
                Re-open{" "}
              </Button>
            )}

            <Button variant="danger">
              <i className="fa fa-trash"
                aria-hidden="true"
                onClick={() => this.DeleteModalhandler(item.id)}
              ></i>
            </Button>
          </td>
        </tr>
      ));

      var DisplayPendingtask = AvailableData.filter(function (obj) {
        for (var key in obj) {
          if (obj[key].includes("pending")) {
            return obj;
          }
        }
      });

      var TaskPendingList = DisplayPendingtask.map((item) => (
        <tr key={item.id}>
          <td className="Title" onClick={() => this.Taskdataview(item.id)} >{item.Title}</td>
          <td>{item.Priority}</td>
          <td>{item.CreatedAt}</td>
          <td>{item.Duedate}</td>
          <td>
            <Button variant="primary mr-2 ">
              <i
                className="fa fa-pencil-square-o"
                aria-hidden="true"
                id={item.id}
                onClick={this.Edithandler}
              ></i>
            </Button>
            <span>
              
              {item.CurrentState === "pending" ? (
                <Button
                  className="Reopen-button"
                  variant="success mr-2"
                  id={item.id}
                  onClick={this.CompleteTaskhandler}>
                  Done
                </Button>
                ) : (
                <Button variant="secondary mr-2" id={item.id}>
                  Re-open
                </Button>
              )}
            </span>
              <Button variant="danger"><i className="fa fa-trash" aria-hidden="true" onClick={this.DeleteModalhandler}></i></Button>
          </td>
        </tr>
      ));

      var DisplayDonetask = AvailableData.filter(function (obj) {
        for (var key in obj) {
          if (obj[key].includes("Done")) {
            return obj;
          }
        }
      });

      var TaskDoneList = DisplayDonetask.map((item) => (
        <tr key={item.id}>
          <td className="Title" onClick={() => this.Taskdataview(item.id)}>{item.Title}</td>
          <td>{item.Priority}</td>
          <td>{item.CreatedAt}</td>
          <td>{item.Duedate}</td>
          <td>
            <Button variant="primary mr-2 ">
              <i className="fa fa-pencil-square-o"
                aria-hidden="true"
                id={item.id}
                onClick={this.Edithandler}
              ></i>
            </Button>
            <span>
              {item.CurrentState === "pending" ? (
                <Button
                  className="Reopen-button"
                  variant="success mr-2"
                  id={item.id}
                  onClick={this.CompleteTaskhandler}>
                  Done{" "}
                </Button>
                ) : (
                <Button variant="secondary mr-2" id={item.id}>
                  Re-open{" "}
                </Button>
              )}
            </span>
            <Button variant="danger"><i className="fa fa-trash" aria-hidden="true" onClick={this.DeleteModalhandler}></i></Button>
          </td>
        </tr>
      ));
    }

    return (
      <div>
        <Container>
          <Row>
            <Col sm={6} className="text-left">
              <h2 className="text-left mt2">ToDo App</h2>
            </Col>
            <Col sm={6} className="text-right">
              <div>
                <i
                  className="fa fa-plus-circle fa-2x"
                  aria-hidden="true"
                  onClick={this.AddInfoHandler}
                ></i>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="text-left">
              <Form.Label> Group By</Form.Label>
              <Form.Control
                as="select"
                onChange={this.GroupSearchchangehandler}
                name="groupby">
                <option value="none">None</option>
                <option value="Createdat">Created On</option>
                <option value="pending">Pending On</option>
                <option value="Priority">Priority</option>
              </Form.Control>
            </Col>
            <Col sm={8}>
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                name="search"
                placeholder="Search Tasks Name"
                onChange={this.SearchTaskhnadler}
              />
            </Col>
          </Row>
          <div>
            <Modal show={this.state.Addtaskmodal}>
              <Modal.Header closeButton onClick={this.modalClosehandle}>
                <Modal.Title>Add Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.submithandler}>
                  <Row>
                    <Col sm={12}>
                      <Form.Control
                        type="hidden"
                        name="currentstate"
                        value="pending" />
                      <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={this.Titlechangehandler}
                          name="Title"
                          maxLength="140"
                          minLength="10"
                          required />
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group controlId="formBasicDescription">
                        <Form.Label> Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          onChange={this.Descriptionchangehandler}
                          maxLength="500"
                          minLength="10"
                          name="Description"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="formBasicDueDate">
                        <Form.Label> DueDate</Form.Label>
                        <Form.Control
                          type="date"
                          onChange={this.Duedatechangehandler}
                          name="Duedate"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="Priority">
                        <Form.Label> Priority</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={this.Prioritychangehandler}
                          name="Priority"
                          required
                        >
                          <option >Select Value</option>
                          <option value="none">None</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group className="text-right">
                        <Button
                          variant="secondary"
                          type="submit"
                          className="themesflat-button blue mr-2"
                          onClick={this.modalClosehandle}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="success"
                          type="submit"
                          className="themesflat-button blue"
                        >
                          Save Changes
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
          <div>
            <Modal show={this.state.Edittaskmodal}>
              <Modal.Header closeButton onClick={this.modalClosehandle}>
                <Modal.Title>Edit Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.updated_submithandler}>
                  <Row>
                    <Col sm={12}>
                      <Form.Control
                        type="hidden"
                        name="id"
                        value={this.state.edit_id}
                      />
                      <Form.Group controlId="Summery">
                        <Form.Label>Summery</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={this.UpdateTitlechangehandler}
                          name="Title"
                          maxLength="140"
                          minLength="10"
                          value={this.state.updatedTitle}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group controlId="Description">
                        <Form.Label> Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          onChange={this.UpdateDescriptionchangehandler}
                          maxLength="500"
                          minLength="10"
                          name="Description"
                          value={this.state.updatedDescription}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="DueDate">
                        <Form.Label> DueDate</Form.Label>
                        <Form.Control
                          type="date"
                          onChange={this.UpdateDuedatechangehandler}
                          name="Duedate"
                          value={this.state.updatedDuedate}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="Priority">
                        <Form.Label> Priority</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={this.UpdatePrioritychangehandler}
                          name="Priority"
                          value={this.state.updatedPriority}>
                          <option selected>Select Value</option>
                          <option value="none">None</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group className="text-right">
                        <Button
                          variant="secondary"
                          className="themesflat-button blue mr-2"
                          onClick={this.modalClosehandle}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="success"
                          type="submit"
                          className="themesflat-button blue"
                        >
                          Save
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
          <div>
            <Modal show={this.state.Viewtaskmodal}>
              <Modal.Header closeButton onClick={this.modalClosehandle}>
                <Modal.Title>View Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col sm={12}>
                      <Form.Control
                        type="hidden"
                        name="id"
                        value={this.state.edit_id}
                      />
                      <Form.Group controlId="Summery">
                        <Form.Label>Summery</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={this.UpdateTitlechangehandler}
                          name="Title"
                          value={this.state.viewTitle}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group controlId="Description">
                        <Form.Label> Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          onChange={this.UpdateDescriptionchangehandler}
                          name="Description"
                          value={this.state.viewdDescription}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="DueDate">
                        <Form.Label> DueDate</Form.Label>
                        <Form.Control
                          type="date"
                          onChange={this.UpdateDuedatechangehandler}
                          name="Duedate"
                          value={this.state.viewDuedate}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="Priority">
                        <Form.Label> Priority</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={this.UpdatePrioritychangehandler}
                          name="Priority"
                          value={this.state.viewPriority}
                          readOnly
                        >
                          <option selected>Select Value</option>
                          <option value="none">None</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group className="text-right">
                        <Button
                          variant="secondary"
                          className="themesflat-button blue mr-2"
                          onClick={this.modalClosehandle}
                        >
                          Cancel
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
          <div>
            <Modal show={this.state.Deletetaskmodal}>
              <Modal.Header
                closeButton
                onClick={this.modalClosehandle}
              ></Modal.Header>
              <Modal.Body>
                <Row>
                  <Col sm={12}>
                    <div className="DeleteModal">
                      <h4> Do you want to delete this task? </h4>
                      <Button
                        variant="secondary"
                        type="submit"
                        className="themesflat-button blue mr-2"
                        onClick={this.modalClosehandle}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="success"
                        type="submit"
                        variant="danger"
                        id={this.state.Deletetaskid}
                        onClick={this.DeleteTaskhandler}
                      >
                        Delete
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>
          </div>
          <div className="TaskList">
            <Tabs>
              <TabList>
                <Tab>ALL</Tab>
                <Tab>Pending</Tab>
                <Tab>Completed</Tab>
              </TabList>
              <TabPanel>
                <div>
                  <Table bordered>
                    <thead>
                      <tr onClick={this.SortTaskhandler}>
                        <th>Summery</th>
                        <th>Priority</th>
                        <th>Created On</th>
                        <th>Due by</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{AllTaskList}</tbody>
                  </Table>
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <Table bordered>
                    <thead>
                      <tr onClick={this.SortTaskhandler}>
                        <th>Summery</th>
                        <th>Priority</th>
                        <th>Created On</th>
                        <th>Due by</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{TaskPendingList}</tbody>
                  </Table>
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <Table bordered>
                    <thead>
                      <tr onClick={this.SortTaskhandler}>
                        <th>Summery</th>
                        <th>Priority</th>
                        <th>Created On</th>
                        <th>Due by</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{TaskDoneList}</tbody>
                  </Table>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Listdata: state.Taskbook,
  };
};
export default connect(mapStateToProps)(App);
