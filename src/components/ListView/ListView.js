import React, { useState, useEffect, useRef } from "react";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { useAuth0 } from "../../react-auth0-spa";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loading from '../Loading/Loading';
import UserSelector from '../UserSelector/UserSelector';

const ListView = ({ styles, actions }) => {
  const { getTokenSilently } = useAuth0();
  let [lists, setLists] = useState(null);
  const [loading, setLoading] = useState(true)
  const [listLoading, setListLoading] = useState(false)
  const [taskLoading, setTaskLoading] = useState(false)
  const [user, setUser] = useState(actions.getUser())
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    body: '',
    footer: null
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const listTemplate = {
    title: '',
    description: '',
    users: [],
    tasks: []
  }

  const taskTemplate = {
    assignedUser: '',
    task: '',
    completed: false,
    points: 0
  }

  const indexLists = (lists) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    newLists.forEach((list, lidx) => {
      list.listIdx = lidx;
      list.tasks.forEach((task, tidx) => {
        task.taskIdx = tidx;
      })
    });
    return newLists;
  }

  const apiFindUsers = async (input) => {
    try {
      const token = await getTokenSilently()
      let response = await fetch(`/user/email/${input}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const msg = await response.json()
      return msg.msg
    } catch(err) {
      console.warn(err)
    }
  }

  const apiGetNewList = async () => {
    try {
      const token = await getTokenSilently()
      let response = await fetch('/list/new', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      response = await response.json()
      return response.msg;
    } catch(err) {
      console.warn(err)
    }
  }

  const apiGetLists = async () => {
    try {
      const token = await getTokenSilently()
      let response = await fetch('/lists', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      response = await response.json()
      return response.msg;
    } catch(err) {
      console.warn(err)
    }
  }

  const listsToUpdate = useRef([]);
  const apiUpdateList = async (listToUpdate) => {
    const apiUpdate = async (listToUpdateInner) =>{
      try {
        const tempList = JSON.parse(JSON.stringify(listToUpdateInner))
        tempList.owner = tempList.owner === undefined ? undefined : tempList.owner._id
        tempList.users = tempList.users.map(user => user._id);
        tempList.tasks = tempList.tasks.map(task => task._id);
  
        const token = await getTokenSilently()
        let response = await fetch('/list', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tempList)
        })
        response = await response.json()
        listsToUpdate.current = listsToUpdate.current.filter(list =>  list._id !== listToUpdateInner._id)
        return response.msg;
      } catch(err) {
        console.warn(err)
      }
    }

    const deb = listsToUpdate.current.find((list) => list._id === listToUpdate._id)

    if (!deb) {
      listsToUpdate.current.push({
        _id: listToUpdate._id,
        timer: setTimeout(() => {
          apiUpdate(listToUpdate);
        }, 800)
      })
    } else {
      clearTimeout(deb.timer);
      deb.timer = setTimeout(() => {
        apiUpdate(listToUpdate);
      }, 800)
    }
  }

  const tasksToUpdate = useRef([]);
  const apiUpdateTask = async (taskToUpdate) => {
    const apiUpdate = async (taskToUpdateInner) =>{
      try {
        const tempTask = JSON.parse(JSON.stringify(taskToUpdateInner))

        const token = await getTokenSilently()
        let response = await fetch('/task', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tempTask)
        })
        response = await response.json()
        tasksToUpdate.current = tasksToUpdate.current.filter(task =>  task._id !== taskToUpdate._id)
        return response.msg;
      } catch(err) {
        console.warn(err)
      }
    }

    const deb = tasksToUpdate.current.find((task) => task._id === taskToUpdate._id)

    if (!deb) {
      tasksToUpdate.current.push({
        _id: taskToUpdate._id,
        timer: setTimeout(() => {
          apiUpdate(taskToUpdate);
        }, 800)
      })
    } else {
      clearTimeout(deb.timer);
      deb.timer = setTimeout(() => {
        apiUpdate(taskToUpdate);
      }, 800)
    }
  }

  const apiGetNewTask = async (listToUpdate) => {
    try {
      const token = await getTokenSilently()
      let response = await fetch('/task/new', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      response = await response.json()
      return response.msg;
    } catch(err) {
      console.warn(err)
    }
  }

  const apiTest = async (listToUpdate) => {
    try {
      const token = await getTokenSilently()
      let response = await fetch('/task/new', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      response = await response.json()
    } catch(err) {
      console.warn(err)
    }
  }

  const addNewList = () => {
    setListLoading(true);
    apiGetNewList()
    .then((list) => {
      let newLists = JSON.parse(JSON.stringify(lists));
      list.owner = actions.getUser();
      newLists.push(list);
      newLists = indexLists(newLists);
      setLists(newLists)
      setListLoading(false);
    })
  }
  
  const updateListTitle = (listIdx, newTitle) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists[listIdx];
    list.title = newTitle;
    apiUpdateList(list);
    setLists(newLists);
  }

  const updateListDescription = (listIdx, newDescription) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists[listIdx];
    list.description = newDescription;
    apiUpdateList(list);
    setLists(newLists)
  }

  const deleteList = (listIdx) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists.splice(listIdx, 1)[0];
    list.owner = undefined;
    apiUpdateList(list);
    setLists(newLists)
  }
  
  const addNewTask = (listIdx) => {
    setTaskLoading(true);
    apiGetNewTask()
    .then((task) => {
      let newLists = JSON.parse(JSON.stringify(lists));
      const list = newLists[listIdx];
      task.assignedUser = null;
      list.tasks.push(task);
      apiUpdateList(list);
      newLists = indexLists(newLists);
      setLists(newLists);
      setTaskLoading(false);
    })
  }
  
  const updateTaskName = (listIdx, taskIdx, newTaskName) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists[listIdx];
    const task = list.tasks[taskIdx];
    task.task = newTaskName;
    apiUpdateTask(task);
    setLists(newLists)
  }
  
  const updateTaskPoints = (listIdx, taskIdx, newTaskPoints) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists[listIdx];
    const task = list.tasks[taskIdx];
    task.points = newTaskPoints;
    apiUpdateTask(task);
    setLists(newLists);
  }
  
  const updateTaskCompleted = (listIdx, taskIdx) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists[listIdx];
    const task = list.tasks[taskIdx];
    task.completed = !task.completed;
    apiUpdateTask(task);
    setLists(newLists)
  }

  const updateTaskUser = (listIdx, taskIdx, newUser) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists[listIdx];
    const task = list.tasks[taskIdx];
    task.assignedUser = newUser
    apiUpdateTask(task);
    setLists(newLists)
  }

  const deleteTask = (listIdx, taskIdx) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists[listIdx];
    const task = list.tasks.splice(taskIdx, 1);
    apiUpdateList(list);
    setLists(newLists)
  }

  useEffect(() => {
    const timerGetUser = () => {
      const u = actions.getUser();
      if (u !== null) {
        setUser(u);
      } else {
        setTimeout(timerGetUser, 500)
      }
    }

    if (user === null) timerGetUser();
  }, [actions, user])

  useEffect(() => {
    if (user !== null && lists == null) {
      apiGetLists()
      .then((lists) => {
        lists.forEach((list, lidx) => {
          if (list.owner === user._id) list.owner = user;
        });
        lists = indexLists(lists);
        setLists(lists.length ? lists : []);
        setLoading(false);
      })
    }
  }, [getTokenSilently, lists, user])

  const tasksRender = (list, listIdx) => list.tasks
  .filter(task => task.assignedUser && task.assignedUser._id === user._id)
  .map((task, tidx) => {
    const { taskIdx } = task;
    return (
      <Card key={`${task._id}`}>
        <Accordion.Toggle as={Card.Header} eventKey={`${listIdx}${taskIdx}`}>
          <span>
            <span
              className="float-left"
              style={{ 
                wordBreak: 'break-all',
                marginTop: '2px',
                overflow: 'hidden'
              }}
            >
              {`${taskIdx + 1}. ${task.task}`}
            </span>
            <div className="float-right" >
              <span style={{ marginTop: '2px', paddingRight: '5px'}}>Completed: </span>
              <Button
                size="sm"
                variant={`outline-${task.completed ? 'success' : 'dark'}`}
                onClick={(e) => {e.stopPropagation(); updateTaskCompleted(listIdx, taskIdx)}}
              >
                {task.completed ? '✔':'❌'}
              </Button>
            </div>
          </span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={`${listIdx}${taskIdx}`}>
          <Card.Body>
            Task: 
            <Form.Control
              disabled
              size="sm"
              type="text"
              value={task.task}
            />
            <br/>
            <span>Points: <small>(Integers only)</small></span>
            <Form.Control
              disabled
              size="sm"
              type="text"
              value={task.points}
            />
            <br/>
            <span>Assigned User: </span>
            <Button
              disabled
              block
              size="sm"
              variant="outline-info"
              onClick={() => {
                let tempUser = null;
                const setTempUser = (newTempUser) => {
                  tempUser = newTempUser;
                }
                setModalData({
                  title: 'Delete Task Confirmation',
                  body: (
                    <UserSelector 
                      currentUser={task.assignedUser}
                      findUser={(input) => apiFindUsers(input)}
                      setAssignedUser={(newUser) => setTempUser(newUser)}
                    />
                  ),
                  footer: (
                    <>
                      <Button variant="primary" onClick={
                        () => {
                          updateTaskUser(listIdx, taskIdx, tempUser)
                          handleClose();
                        }
                      }>
                        Accept
                      </Button>
                    </>
                  )
                })
                handleShow(listIdx)
              }}
            >
              {task.assignedUser ? task.assignedUser.email : 'Assign New User'}
            </Button>
            <br/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  })

  const tasksOwnerRender = (list, listIdx) => list.tasks.map((task, tidx) => {
    const { taskIdx } = task;
    return (
      <Card key={`${task._id}`}>
        <Accordion.Toggle as={Card.Header} eventKey={`${listIdx}${taskIdx}`}>
          <span>
            <span
              className="float-left"
              style={{ 
                wordBreak: 'break-all',
                marginTop: '2px',
                overflow: 'hidden'
              }}
            >
              {`${taskIdx + 1}. ${task.task}`}
            </span>
            <div className="float-right" >
              <span style={{ marginTop: '2px', paddingRight: '5px'}}>Completed: </span>
              <Button
                size="sm"
                variant={`outline-${task.completed ? 'success' : 'dark'}`}
                onClick={(e) => {e.stopPropagation(); updateTaskCompleted(listIdx, taskIdx)}}
              >
                {task.completed ? '✔':'❌'}
              </Button>
            </div>
          </span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={`${listIdx}${taskIdx}`}>
          <Card.Body>
            Task: 
            <Form.Control
              size="sm"
              type="text"
              value={task.task}
              onChange={(e) => updateTaskName(listIdx, taskIdx, e.target.value)}
            />
            <br/>
            <span>Points: <small>(Integers only)</small></span>
            <Form.Control
              size="sm"
              type="text"
              value={task.points}
              onChange={(e) => {
                let newPoints = parseInt(e.target.value);
                if (isNaN(newPoints)) {
                  newPoints = 0;
                }
                updateTaskPoints(listIdx, taskIdx, newPoints)
              }}
            />
            <br/>
            <span>Assigned User: <small>(Click to change)</small></span>
            <Button
              block
              size="sm"
              variant="outline-info"
              onClick={() => {
                let tempUser = null;
                const setTempUser = (newTempUser) => {
                  tempUser = newTempUser;
                }
                setModalData({
                  title: 'Delete Task Confirmation',
                  body: (
                    <UserSelector 
                      currentUser={task.assignedUser}
                      findUser={(input) => apiFindUsers(input)}
                      setAssignedUser={(newUser) => setTempUser(newUser)}
                    />
                  ),
                  footer: (
                    <>
                      <Button variant="primary" onClick={
                        () => {
                          updateTaskUser(listIdx, taskIdx, tempUser)
                          handleClose();
                        }
                      }>
                        Accept
                      </Button>
                    </>
                  )
                })
                handleShow(listIdx)
              }}
            >
              {task.assignedUser ? task.assignedUser.email : 'Assign New User'}
            </Button>
            <br/>
            <Button
              className="float-right"
              size="sm"
              variant="outline-danger"
              onClick={() => {
                setModalData({
                  title: 'Delete Task Confirmation',
                  body: 'Are you sure you want to delete this task?',
                  footer: (
                    <>
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant="danger" onClick={() => {
                        deleteTask(listIdx, taskIdx);
                        handleClose();
                      }}>
                        Delete
                      </Button>
                    </>
                  )
                })
                handleShow(listIdx)
              }}
            >
              {'🗑️'}
            </Button>
            <br/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  })

  const listsRender = (owner) => lists
    .filter((list) => owner 
      ? list.owner._id === user._id
      : list.tasks.some(task => task.assignedUser && task.assignedUser._id === user._id))
    .map((list, lidx) => {
      const { listIdx } = list;
      return (
        <Card key={`${list._id}`}>
          <Accordion.Toggle as={Card.Header} eventKey={listIdx}>
          <span>
            <span 
              className="float-left"
              style={{ 
                wordBreak: 'break-word',
                overflow: 'hidden'
              }}>
                {list.title}
              </span>
            <span 
              className="float-right"
              style={{ 
                marginLeft: '5px'
              }}
            >
              {`Tasks Completed: ${
                owner
                ? list.tasks.filter(task => task.completed).length
                : list.tasks.filter(task => task.assignedUser && task.assignedUser._id === user._id && task.completed).length
              } / ${
                owner
                ? list.tasks.length
                : list.tasks.filter(task => task.assignedUser && task.assignedUser._id === user._id).length
              }`}
            </span>
          </span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={listIdx}>
            <Card.Body>
              Title: 
              <Form.Control
                disabled={!owner}
                size="sm"
                type="text"
                value={list.title}
                onChange={(e) => updateListTitle(listIdx, e.target.value)}
              />
              <br/>
              Description: 
              <Form.Control
              disabled={!owner}
                size="sm"
                as="textarea"
                rows="3"
                value={list.description}
                onChange={(e) => updateListDescription(listIdx, e.target.value)}
              />
              <br/>
              <Accordion defaultActiveKey="0">
                Tasks:
                {owner ? tasksOwnerRender(list, listIdx) : tasksRender(list, listIdx)}
              </Accordion>
              <br/>
              {owner ? (<Button
                variant="secondary"
                block
                onClick={() => addNewTask(listIdx)}
              >
                <span style={{fontSize: 20}} >+</span> New Task
              </Button>) : null}
              {owner ? (<Button
                disabled={!owner}
                size="sm"
                variant="outline-danger"
                block
                onClick={() => {
                  setModalData({
                    title: 'Delete List Confirmation',
                    body: 'Are you sure you want to delete this list?',
                    footer: (
                      <>
                        <Button variant="secondary" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button variant="danger" onClick={() => {
                          deleteList(listIdx);
                          handleClose();
                        }}>
                          Delete
                        </Button>
                      </>
                    )
                  })
                  handleShow(listIdx)
                }}
              >
                {'🗑️ Delete List'}
              </Button>) : null}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
  })

  let view = (<><Loading /><br/></>)
  if (user && user.authId && !loading) {
    view = (
      <Tab.Container id="left-tabs-example" defaultActiveKey="lists">
          <Nav fill variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="lists">My Lists</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tasks">My Tasks</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="lists">
              <Container>
                <br/>
                <Row>
                  <Col className="text-center">
                    <h4>Your Lists</h4>
                    <p>Lists that you own.</p>
                  </Col>
                </Row>
                <br/>
                <Accordion defaultActiveKey="0">
                  {listsRender(true)}
                </Accordion>
                <br/>
                <Row>
                  <Col>
                    <Button
                      variant="primary"
                      block
                      onClick={() => addNewList()}
                    >
                      <span style={{fontSize: 20}} >+</span> New List
                    </Button>
                  </Col>
                </Row>
              </Container>
              <br/>
            </Tab.Pane>
            <Tab.Pane eventKey="tasks">
              <Container>
                <br/>
                <Row>
                  <Col className="text-center">
                    <h4>Your Tasks</h4>
                    <p>Tasks assigned to you.</p>
                  </Col>
                </Row>
                <br/>
                <Accordion defaultActiveKey="0">
                  {listsRender(false)}
                </Accordion>
              </Container>
              <br/>
            </Tab.Pane>
          </Tab.Content>
      </Tab.Container>
    );
  }

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData.body}
        </Modal.Body>
        <Modal.Footer>
          {modalData.footer}
        </Modal.Footer>
      </Modal>
      {view}
    </>
  );
};

export default ListView;
