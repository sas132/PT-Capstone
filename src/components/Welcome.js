import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import Button from 'react-bootstrap/Button';

const Welcome = ({ styles, updateContent}) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  if (isAuthenticated && updateContent) updateContent()

  return (
    <div className="text-center">
      <br />
      <h1>DO IT</h1>
      <div>An app that helps you get things done!</div>
      <br/>
      <br/>
      <br/>
      <small>Please Login to Continue...</small>
      <br/>
      <Button 
        variant="success"
        onClick={() => loginWithRedirect({})}
      >
        Log in / Sign Up
      </Button>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default Welcome;
