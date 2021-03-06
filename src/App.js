import React, { Component } from "react";
import TopBar from "./components/Topbar/TopBar";
import FooterMenu from "./components/FooterMenu/FooterMenu";
import Content from "./components/Content/Content";
import Sidebar from "./components/Sidebar/Sidebar";
import ListView from "./components/ListView/ListView";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";

import { Auth0Context } from "./react-auth0-spa";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      dark: false,
      content: <ListView actions={this.actions}/>,
      user: null
    };

    this.actions = {
      setContent: (cont) => this.setContent(cont),
      setUser: (user) => this.setUser(user),
      getUser: () => this.getUser()
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.setContent(<ListView actions={this.actions}/>)
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
    this.setState({ content });
  }

  setUser(user) {
    this.setState({ user });
  }

  getUser() {
    const { user } = this.state;
    return user;
  }

  render() {
    const { windowWidth, content, user } = this.state;
    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 40,
      footerMenuHeight: 50,
      showFooterMenuText: windowWidth > 500,
      showSidebar: windowWidth > 768,
      sidebarWidth: windowWidth < 1100 ? 50 : 150,
      sidebarCollapsed: windowWidth < 1100,
      windowWidth
    };

    const menuItems = styles.showSidebar
      ? [
          {
            icon: `📝`,
            text: "To-Do Lists",
            action: () => this.setContent(<ListView actions={this.actions} />)
          },
          // { 
          //   icon: `👩`,
          //   text: "People",
          //   action: () => this.setContent(<Profile />)
          // },
          { 
            icon: `🕶️`,
            text: "Profile",
            action: () => this.setContent(<Profile />)
          },
          {
            icon: `⚙️`,
            text: "Settings",
            action: () => this.setContent(<Settings />)
          }
        ]
      : [
          { borders: false },
          {
            icon: `📝`,
            text: "To-Do Lists",
            action: () => this.setContent(<ListView actions={this.actions} />),
            borders: true
          },
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
          <Sidebar menuItems={menuItems} styles={styles} actions={this.actions} />
        ) : (
          <TopBar styles={styles} actions={this.actions} />
        )}
        <Content styles={styles} comp={content} actions={this.actions} />

        {!styles.showSidebar && (
          <FooterMenu menuItems={menuItems} styles={styles} actions={this.actions} />
        )}
      </div>
    );
  }
}

App.contextType = Auth0Context;

export default App;
