import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

class CategoryDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtID: "",
      txtName: "",
    };
  }

  render() {
    return (
      <div className="float-right">
        <h2 className="text-center">CATEGORY DETAIL</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtID}
                    onChange={(e) => {
                      this.setState({ txtID: e.target.value });
                    }}
                    readOnly={true}
                  />
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtName}
                    onChange={(e) => {
                      this.setState({ txtName: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    type="button"
                    className="btn"
                    value="ADD NEW"
                    onClick={(e) => this.btnAddClick(e)}
                  />
                  <input
                    type="button"
                    className="btn"
                    value="UPDATE"
                    onClick={(e) => this.btnUpdateClick(e)}
                  />
                  <input
                    type="button"
                    className="btn"
                    value="DELETE"
                    onClick={(e) => this.btnDeleteClick(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  // event-handles
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert("Please input name");
    }
  }
  apiPostCategory(cate) {
    const token =
      (this.context && this.context.token) ||
      window.localStorage.getItem("token");
    if (!token) {
      alert("Not authenticated");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    axios
      .post("/api/admin/categories", cate, { headers })
      .then((res) => {
        if (res.data && res.data.success !== false) {
          alert("OK BABY!");
          if (this.props.apiGetCategories) this.props.apiGetCategories();
        } else {
          alert(res.data.message || "Create failed");
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || err.message);
      });
  }
  // UPDATE
  btnUpdateClick(e) {
    e.preventDefault();
    const { txtID, txtName } = this.state;
    if (txtID && txtName) {
      this.apiPutCategory(txtID, { name: txtName });
    } else {
      alert("Please input id and name");
    }
  }

  apiPutCategory(id, cate) {
    const token =
      (this.context && this.context.token) ||
      window.localStorage.getItem("token");
    if (!token) {
      alert("Not authenticated");
      return;
    }
    const headers = { Authorization: "Bearer " + token };
    axios
      .put("/api/admin/categories/" + id, cate, { headers })
      .then((res) => {
        if (res.data && res.data.success !== false) {
          alert("OK BABY!");
          if (this.props.apiGetCategories) this.props.apiGetCategories();
        } else {
          alert(res.data.message || "Update failed");
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || err.message);
      });
  }
  // DELETE
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm("ARE YOU SURE?")) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert("Please input id");
      }
    }
  }

  apiDeleteCategory(id) {
    const token =
      (this.context && this.context.token) ||
      window.localStorage.getItem("token");
    if (!token) {
      alert("Not authenticated");
      return;
    }
    const headers = { Authorization: "Bearer " + token };
    axios
      .delete("/api/admin/categories/" + id, { headers })
      .then((res) => {
        if (res.data && res.data.success !== false) {
          alert("OK BABY!");
          if (this.props.apiGetCategories) this.props.apiGetCategories();
        } else {
          alert(res.data.message || "Delete failed");
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || err.message);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
      });
    }
  }
}

export default CategoryDetail;
