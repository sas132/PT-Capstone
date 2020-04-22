import React from "react";
import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {

  return (
    <div className="text-center">
      <br/>
      <br/>
      <Spinner animation="border" variant="primary" />
      <div>Loading...</div>
    </div>
  );
};

export default Loading;