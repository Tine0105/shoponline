import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";

class Inform extends Component {
  static contextType = MyContext;
  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          <Link to="/login">Login</Link> | <Link to="/signup">Sign-up</Link> |{" "}
          <Link to="/active">Active</Link>
        </div>

        <div className="float-right">
          <Link to="/mycart">My cart</Link> have
          <b>{this.context.mycart.length}</b> items
        </div>

        <div className="float-clear" />
        <Link to="/myprofile">My profile</Link>
        <Link to="/myorders"> My orders </Link>
      </div>
    );
  }

  // event- handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setCustomer(null);
    this.context.setMyCart([]);
  }
}

export default Inform;
