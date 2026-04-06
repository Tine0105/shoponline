import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import MyProvider from "./contexts/MyProvider";
import Login from "./components/LoginComponent";
import Main from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Loading...",
    };
  }

  componentDidMount() {
    axios
      .get("/hello")
      .then((res) => {
        const result = res.data;
        this.setState({ message: result.message });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ message: "Error connecting to server" });
      });
  }

  render() {
    return (
      <MyProvider>
        <Login />
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </MyProvider>
    );
  }
}

export default App;
