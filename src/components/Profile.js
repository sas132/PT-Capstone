import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const Profile = () => {
  const { loading, user, isAuthenticated, logout } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <br/>
      <Container>
        <Row>
          <Col sm="1" md="2">
            <Image src={user.picture} roundedCircle={true} fluid={true} alt="Profile" />
          </Col>
          <Col sm="auto" md="auto">
            <h3>Name: {user.name}</h3>
            <p>Email: {user.email}</p>
            {
              isAuthenticated && 
              <Button
                variant="danger"
                onClick={() => logout()}
              >
                Log out
              </Button>
            }
          </Col>
        </Row>
      </Container>
      <br/>
    </>
  );
};

export default Profile;