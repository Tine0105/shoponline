import React, { Component } from "react";
import MyContext from "./MyContext";

class MyProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // variables
      token: localStorage.getItem("token") || "",
      customer: JSON.parse(localStorage.getItem("customer")) || null,
      mycart: [],

      // functions
      setToken: this.setToken,
      setCustomer: this.setCustomer,
      setMyCart: this.setMyCart,
    };
  }

  setToken = (value) => {
    localStorage.setItem("token", value || "");
    this.setState({ token: value });
  };

  setCustomer = (value) => {
    if (value) {
      localStorage.setItem("customer", JSON.stringify(value));
    } else {
      localStorage.removeItem("customer");
    }
    this.setState({ customer: value });
  };

  setMyCart = (value) => {
    this.setState({ mycart: value });
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
