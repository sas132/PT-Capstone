import React, { useState, useEffect } from "react";
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
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal';
import Loading from '../Loading/Loading';
import Image from 'react-bootstrap/Image';

const UserSelector = ({ findUser, setAssignedUser }) => {
  const [ searchInput, setSearchInput ] = useState('');
  const [ userList, setUserList ] = useState([]);
  const [ selectedUser, setSelectedUser ] = useState(null);
  const [loading, setLoading] = useState(false)

  return (
    <>
      <div>
        <InputGroup className="mb-3">
          <Form.Control
            size="sm"
            type="text"
            placeholder="User Email..."
            aria-label="User's Email"
            aria-describedby="basic-addon2"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <InputGroup.Append>
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => {
                setLoading(true);
                findUser(searchInput)
                .then(users => {
                  setUserList(users || [])
                  setLoading(false)
                })
              }}
            >
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
        Selected User:
        <Table size="sm" borderless>
          <tbody>
            <tr>
              <td>
                {
                  selectedUser 
                    ? (
                      <Image
                        style={{ width: '30px', height: '30px' }} 
                        src={selectedUser ? selectedUser.picture : null}
                        roundedCircle={true}
                        fluid={true}
                        alt="Profile"
                      />
                    ) : (
                      null
                    )
                }
              </td>
              <td>{selectedUser ? selectedUser.email : null}</td>
            </tr>
          </tbody>
        </Table>
        <hr/>
      </div>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {
          loading
            ? (
              <Loading />
            ) : (
              <Table size="sm" striped borderless hover>
                <tbody>
                  {userList.map(user => (
                    <tr
                      style={{ cursor: 'pointer' }}
                      key={user._id}
                      onClick={() => {
                        setSelectedUser(user);
                        setAssignedUser(user);
                      }}
                    >
                      <td>
                        <Image
                          style={{ width: '30px', height: '30px' }} 
                          src={user.picture}
                          roundedCircle={true}
                          fluid={true}
                          alt="Profile"
                        />
                      </td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )
        }
      </div>
    </>
  )
}

export default UserSelector;