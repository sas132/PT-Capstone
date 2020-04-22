import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const Profile = () => {
  return (
    <>
      <br/>
      <Container>
        <Row>
          <Col>
            <h4 className="text-center">DO IT Settings</h4>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <Form.Check 
              type="switch"
              id="switch1"
              label="There are no settings yet."
            />
            <Form.Check 
              type="switch"
              id="switch2"
              label="Dark Mode"
            />
            <Form.Check 
              type="switch"
              id="switch3"
              label="This is just a mock up"
            />
          </Col>
        </Row>
        <Row>
        </Row>
        <Row>
        </Row>
      </Container>
      <br/>
    </>
  );
};

export default Profile;