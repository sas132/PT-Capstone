import React from "react";

const Content = ({ styles, comp }) => {
  const { showSidebar } = styles;

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

  return (
    <div style={contentStyle}>
      <div style={{
        border: "1px dashed #999"
      }}>
        {comp}
      </div>
    </div>
  );
};

export default Content;
