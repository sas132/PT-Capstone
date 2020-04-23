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

  let view = <Loading />
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
                        type="text"
                        value={list.description}
                        onChange={(e) => updateListDescription(listIdx, e.target.value)}
                      />
                      <br/>
                      <Accordion defaultActiveKey="0">
                        <ul>
                          {list.tasks.map((task, taskIdx) => {
                            return (
                              <li key={`${task.assignedUser}${taskIdx}`}>
                                <Card key={`${task.task}${taskIdx}`}>
                                <Accordion.Toggle as={Card.Header} eventKey={`${listIdx}${taskIdx}`}>
                                  {task.task}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={`${listIdx}${taskIdx}`}>
                                  <Card.Body>
                                    {task.points}
                                  </Card.Body>
                                </Accordion.Collapse>
                                </Card>
                              </li>
                            )
                          })}
                        </ul>
                      </Accordion>
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
