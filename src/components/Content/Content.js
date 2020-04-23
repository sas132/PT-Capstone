import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import Welcome from "../Welcome/Welcome";
import Loading from "../Loading/Loading";

const Content = ({ styles, comp, actions, user }) => {
  const { showSidebar } = styles;
  const { isAuthenticated, getTokenSilently } = useAuth0();
  const [ userSent, setUserSent ] = useState(false);
  const loading = (isAuthenticated === undefined)
  
  useEffect(() => {
    if (isAuthenticated && !userSent) {
      setUserSent(true);
      getTokenSilently()
      .then(token => {
        return fetch("/user", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      })
      .then(data => data.json())
      .then(user => actions.setUser(user))
      .catch(err => {
        console.warn(err);
      })
    }
  }, [isAuthenticated, userSent, actions, getTokenSilently])

  const contentWidth = (styles.windowWidth - (styles.sidebarWidth - 40)) > 1100
    ? 1100
    : styles.windowWidth - (styles.sidebarWidth - 40)

  const contentStyle = {
    paddingTop: showSidebar ? 20 : styles.topBarHeight + 20,
    paddingRight: 20,
    paddingBottom: showSidebar ? 20 : styles.footerMenuHeight + 20,
    paddingLeft: showSidebar ? styles.sidebarWidth + 20 : 20,
    width: showSidebar ? contentWidth : "auto"
  };

  const viewToRender = loading
    ? (<Loading />)
    : (
      <div style={{
        border: "1px dashed #999"
      }}>
        {isAuthenticated ? comp : <Welcome />}
      </div>
    )

  return (
    <div style={contentStyle}>
      {viewToRender}
    </div>
  );
};

export default Content;
