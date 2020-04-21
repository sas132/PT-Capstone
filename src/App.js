import React, { Component } from "react";
import TopBar from "./components/TopBar";
import FooterMenu from "./components/FooterMenu";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import ListView from "./components/ListView";
import Welcome from "./components/Welcome";

import { Auth0Context } from "./react-auth0-spa";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      content: null
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.setContent(<ListView />)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  }

  setContent(content) {
    const { isAuthenticated } = this.context;
    console.log(isAuthenticated)
    this.setState({ content: isAuthenticated ? content : (
      <Welcome updateContent={(cont) => this.setContent(cont)}/>
    )});
  }

  render() {
    const { windowWidth, content } = this.state;
    const { isAuthenticated } = this.context;

    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 40,
      footerMenuHeight: 50,
      showFooterMenuText: windowWidth > 500,
      showSidebar: windowWidth > 768,
      sidebarWidth: windowWidth < 1100 ? 50 : 150,
      sidebarCollapsed: windowWidth < 1100
    };

    const menuItems = styles.showSidebar
      ? [
          { icon: `📝`, text: "Todo Lists", action: () => this.setContent(<ListView />)},
          { icon: `🕶`, text: "Profile" },
          { icon: `⚙`, text: "Settings" }
        ]
      : [
          { borders: false },
          { icon: `➕`, text: "New List", action: () => {console.log('hello')}, borders: true },
          { borders: false }
        ];

    return (
      <div
        style={{
          backgroundColor: styles.black(0.05),
          minHeight: "100vh",
          position: "relative"
        }}
      >
        {styles.showSidebar ? (
          <Sidebar menuItems={menuItems} styles={styles} />
        ) : (
          <TopBar styles={styles} />
        )}
        <Content windowWidth={windowWidth} styles={styles} comp={content} />

        {!styles.showSidebar && (
          <FooterMenu menuItems={menuItems} styles={styles} />
        )}
      </div>
    );
  }
}

App.contextType = Auth0Context;

export default App;
