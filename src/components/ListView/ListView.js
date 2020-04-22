import React from "react";
import { useAuth0 } from "../../react-auth0-spa";

const ListView = ({ styles }) => {
  const { getTokenSilently } = useAuth0();

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

  return (
    <div>
      <button onClick={() => apiTest()}>test</button>
    </div>
  );
};

export default ListView;
