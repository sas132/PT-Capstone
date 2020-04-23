import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { useAuth0 } from "../../react-auth0-spa";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loading from '../Loading/Loading'

const ListView = ({ styles, actions }) => {
  const { getTokenSilently } = useAuth0();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(actions.getUser())

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

  const listTemplate = {
    owner: '',
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

  const addNewList = () => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const newList = JSON.parse(JSON.stringify(listTemplate));
    newLists.push(newList);
    newList.owner = actions.getUser().authId;
    newList.title = 'New List';
    newList.description = 'Description...';
    setLists(newLists)
  }
  
  const updateListTitle = (listIdx, newTitle) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists[listIdx];
    list.title = newTitle;
    setLists(newLists)
  }

  const updateListDescription = (listIdx, newDescription) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists[listIdx];
    list.description = newDescription;
    setLists(newLists)
  }

  const addNewTask = (listIdx) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists[listIdx];
    const newTask = JSON.parse(JSON.stringify(taskTemplate));
    newTask.task = 'New Task'
    list.tasks.push(newTask);
    setLists(newLists)
  }

  const updateTaskName = (listIdx, taskIdx, newTaskName) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists[listIdx];
    const task = list.tasks[taskIdx];
    task.task = newTaskName;
    setLists(newLists)
  }

  const updateTaskPoints = (listIdx, taskIdx, newTaskPoints) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists[listIdx];
    const task = list.tasks[taskIdx];
    task.points = newTaskPoints;
    setLists(newLists)
  }

  const updateTaskCompleted = (listIdx, taskIdx) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists[listIdx];
    const task = list.tasks[taskIdx];
    task.completed = !task.completed;
    setLists(newLists)
  }

  const apiTest = async () => {
    try {
      console.log('hello')
      const token = await getTokenSilently()
      let response = await fetch("/user", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      response = await response.json()
      console.log(response)
    } catch(err) {
      console.warn(err)
    }
  }

  let view = (<><Loading /><br/></>)
  if (user && user.authId && !loading) {
    view = (
      <>
        <Container>
          <br/>
          <Row>
            <Col>
              <h4 className="text-center">Your Lists</h4>
            </Col>
          </Row>
          <br/>
          <Accordion defaultActiveKey="0">
            {lists.map((list, listIdx) => {
              return (
                <Card key={`${list.tasks}${listIdx}`}>
                  <Accordion.Toggle as={Card.Header} eventKey={listIdx}>
                    {list.title}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={listIdx}>
                    <Card.Body>
                      Title: 
                      <Form.Control
                        size="sm"
                        type="text"
                        value={list.title}
                        onChange={(e) => updateListTitle(listIdx, e.target.value)}
                      />
                      <br/>
                      Description: 
                      <Form.Control
                        size="sm"
                        as="textarea"
                        rows="3"
                        value={list.description}
                        onChange={(e) => updateListDescription(listIdx, e.target.value)}
                      />
                      <br/>
                      <Accordion defaultActiveKey="0">
                        Tasks:
                        {list.tasks.map((task, taskIdx) => {
                          return (
                            <Card key={`${task.assignedUser}${taskIdx}`}>
                              <Accordion.Toggle as={Card.Header} eventKey={`${listIdx}${taskIdx}`}>
                                <span>
                                  <span style={{marginTop: '2px', overflow: 'hidden'}}>{`${taskIdx + 1}. ${task.task}`}</span>
                                  <Button
                                    size="sm"
                                    className="float-right"
                                    variant={`outline-${task.completed ? 'success' : 'danger'}`}
                                    onClick={(e) => {e.stopPropagation(); updateTaskCompleted(listIdx, taskIdx)}}
                                  >
                                    {task.completed ? '✔':'❌'}
                                  </Button>
                                  <span className="float-right" style={{ marginTop: '2px', paddingRight: '5px'}}>Completed: </span>
                                </span>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey={`${listIdx}${taskIdx}`}>
                                <Card.Body>
                                  Title: 
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
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          )
                        })}
                      </Accordion>
                      <br/>
                      <Button
                        variant="secondary"
                        block
                        onClick={() => addNewTask(listIdx)}
                      >
                        <span style={{fontSize: 20}} >+</span> New Task
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              )
            })}
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
      </>
    );
  }

  return view;
};

export default ListView;
