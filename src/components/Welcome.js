import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import ListView from './ListView';
import Button from 'react-bootstrap/Button';

const Welcome = ({ styles, updateContent}) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  if (isAuthenticated) updateContent(<ListView />)

  return (
    <div className="text-center">
      <h1>DO IT</h1>
      <div>An app that helps you get things done!</div>
      <br/>
      <br/>
      <br/>
      <small>Please Login to Continue...</small>
      <br/>
      <Button 
        variant="primary"
        onClick={() => loginWithRedirect({})}
      >
        Log in
      </Button>
      {" or "}
      <Button 
        variant="success"
        onClick={() => loginWithRedirect({})}
      >
        Sign Up
      </Button>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

// {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

export default Welcome;
