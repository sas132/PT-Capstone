import React from "react";

const FooterMenu = ({ menuItems, styles }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        width: "100%",
        height: styles.footerMenuHeight,
        backgroundColor: "#333",
        color: "#fff",
        position: "fixed",
        bottom: 0
      }}
    >
      {menuItems.map((item, i) => {
        const { icon, text, action, borders } = item;
        return (
          <div
            key={i}
            style={{
              cursor: action ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              borderLeft: borders ? "1px solid #222" : "",
              borderRight: borders ? "1px solid #222" : ""
            }}
            onClick={action}
          >
            <span style={{ marginRight: 5, fontSize: 20 }}>{icon}</span>
            {styles.showFooterMenuText && text}
          </div>
        );
      })}
    </div>
  );
};

export default FooterMenu;
