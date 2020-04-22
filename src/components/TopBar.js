import React from "react";
import Profile from './Profile';
import Settings from './Settings';

const TopBar = ({ styles, actions }) => {
  const { setContent } = actions;
  const topBarStyle = {
    position: "fixed",
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: styles.topBarHeight,
    backgroundColor: "#fff",
    borderBottom: "1px solid #d8d8d8",
    fontWeight: "bold",
    padding: "0px 20px",
    boxSizing: "border-box",
    zIndex: 2
  };

  return (
    <div style={topBarStyle}>
      <span>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setContent(<Profile />)}
        >
          {`🕶️`}
        </div>
      </span>
      DO IT
      <span>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setContent(<Settings />)}
        >
          {`⚙️`}
        </div>
      </span>
    </div>
  );
};

export default TopBar;
