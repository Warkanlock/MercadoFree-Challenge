import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "Search for a product...",
      alertText: false
    };

    this.handleSearchText = this.handleSearchText.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  handleKey(e) {
    if (e.key == "Enter") {
      if (this.state.searchText != "Search for a product...") {
        window.location.href = `/items?search=${this.state.searchText}`;
      } else {
        this.setState({
          alertText: true
        });
      }
      setInterval(() => {
        this.setState({
          alertText: false
        });
      }, 3000);
    }
  }

  search = () => {
    if (this.state.searchText != "Search for a product...") {
      window.location.href = `/items?search=${this.state.searchText}`;
    } else {
      this.setState({
        alertText: true
      });
    }
    setInterval(() => {
      this.setState({
        alertText: false
      });
    }, 3000);
  };

  handleSearchText(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  render() {
    const { alertText } = this.state;

    return (
      <div>
        <div className="stick-header">
          <div>
            <Link to={"/"}>
              <img
                src="http://protalenters.com/wp-content/uploads/2016/08/meli-logo-300x90@2x.png"
                alt="Logo MercadoLibre"
                className="icon-picture"
              />
            </Link>
            <input
              type="text"
              className="input"
              onKeyDown={this.handleKey}
              onChange={this.handleSearchText}
              placeholder={this.state.searchText}
            />
            <a onClick={this.search}>
              <i class="fas fa-search search" />
            </a>
          </div>
        </div>
        {alertText ? (
          <div className="col d-flex justify-content-center">
            <div className="alert alert-danger">
              Enter the product that you want...
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default SearchBar;
