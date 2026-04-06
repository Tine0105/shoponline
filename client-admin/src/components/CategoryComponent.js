import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import CategoryDetail from "./CategoryDetailComponent";

class Category extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null,
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      const isSelected =
        this.state.itemSelected && this.state.itemSelected._id === item._id;
      return (
        <tr
          key={item._id}
          className={isSelected ? "datatable selected" : "datatable"}
          onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
        </tr>
      );
    });

    return (
      <div>
        <div className="float-left">
          <h2 className="text-center">CATEGORY LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>Name</th>
              </tr>
              {cates}
            </tbody>
          </table>
        </div>
        <div className="inline" />
        <CategoryDetail
          item={this.state.itemSelected}
          updateCategories={this.updateCategories}
          apiGetCategories={this.apiGetCategories}
        />
        <div className="float-clear" />
      </div>
    );
  }
  updateCategories = (categories) => {
    this.setState({ categories: categories });
  };
  componentDidMount() {
    this.apiGetCategories();
  }

  trItemClick(item) {
    this.setState({ itemSelected: item });
  }

  apiGetCategories = () => {
    const token =
      (this.context && this.context.token) ||
      window.localStorage.getItem("token");
    if (!token) {
      console.warn("No token available for apiGetCategories");
      return;
    }
    const headers = { Authorization: "Bearer " + token };
    axios
      .get("/api/admin/categories", { headers })
      .then((res) => {
        const result = res.data;
        // If API returns { success: false, message } handle gracefully
        if (result && result.success === false) {
          console.error(result.message);
          return;
        }
        this.setState({ categories: result });
      })
      .catch((err) => {
        console.error("apiGetCategories error", err);
      });
  }
}

export default Category;
