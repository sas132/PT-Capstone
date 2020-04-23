import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
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
          <Col>
            <h4 className="text-center">Your Profile</h4>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col xs="3" sm="3" md="2">
            <Image src={user.picture} roundedCircle={true} fluid={true} alt="Profile" />
          </Col>
          <Col xs="auto" md="auto">
            <h5>Name: {user.name}</h5>
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