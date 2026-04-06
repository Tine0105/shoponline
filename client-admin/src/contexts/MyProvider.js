import React, { Component } from "react";
import MyContext from "./MyContext";

class MyProvider extends Component {
  constructor(props) {
    super(props);
    const savedToken = window.localStorage.getItem("token") || "";
    const savedUsername = window.localStorage.getItem("username") || "";
    this.state = {
      // variables
      token: savedToken,
      username: savedUsername,
      // functions
      setToken: this.setToken,
      setUsername: this.setUsername,
    };
  }

  setToken = (value) => {
    try {
      if (value) window.localStorage.setItem("token", value);
      else window.localStorage.removeItem("token");
    } catch (e) {
      console.warn("localStorage setToken failed", e);
    }
    this.setState({ token: value });
  };

  setUsername = (value) => {
    try {
      if (value) window.localStorage.setItem("username", value);
      else window.localStorage.removeItem("username");
    } catch (e) {
      console.warn("localStorage setUsername failed", e);
    }
    this.setState({ username: value });
  };

  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
