import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const Sidebar = ({ menuItems, styles }) => {
  const sidebarStyle = {
    height: "100vh",
    width: styles.sidebarWidth,
    position: "fixed",
    backgroundColor: styles.black(0.8),
    paddingTop: 40
  };

  const menuItemStyle = {
    cursor: "pointer",
    display: "flex",
    justifyContent: styles.sidebarCollapsed ? "center" : "flex-start",
    alignItems: "center",
    padding: `4px ${styles.sidebarCollapsed ? 0 : 10}px`,
    color: styles.white(0.9),
    borderTop: "1px solid #222",
    borderBottom: "1px solid #222"
  };

  const iconStyle = {
    fontSize: 26,
    marginRight: styles.sidebarCollapsed ? 0 : 10
  };

  const logoStyle = {
    textAlign: "center",
    color: styles.white(),
    fontSize: 28,
    marginBottom: 60,
    fontWeight: "bold"
  };

  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>{styles.sidebarCollapsed ? "DO IT" : "DO IT"}</div>
      {menuItems.map(item => (
        <OverlayTrigger
          key={item.text}
          placement="right"
          overlay={
            <Tooltip id={`tooltip-${item.text}`}>
              {item.text}
            </Tooltip>
          }
        >
          <div 
            style={menuItemStyle}
            onClick={item.action || (() => {})}
          >
            <span style={iconStyle}>{item.icon}</span>
            {!styles.sidebarCollapsed && item.text}
          </div>
        </OverlayTrigger>
      ))}
    </div>
  );
};

export default Sidebar;
