import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import SingleProduct from "../SingleProduct/SingleProduct";
import "./Products.css";

const API = "http://localhost:8080/api/items?q=";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultList: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.searchItem();
  }

  assignData = result => {
    this.setState({
      resultList: result
    });
  };

  searchItem = () => {
    const queryParameters = this.props.location.search;
    const params = new URLSearchParams(queryParameters);

    fetch(`${API}${params.get("search")}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          resultList: data,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { resultList, isLoading } = this.state;
    const queryParameters = this.props.location.search;
    const params = new URLSearchParams(queryParameters);

    if (isLoading) {
      return (
        <>
          <div>
            <SearchBar {...this.props} />
            <div className="col d-flex justify-content-center">
              <div className="cover-screen">Loading, please wait...</div>
            </div>
          </div>
        </>
      );
    }
    return (
      <div>
        <header>
          <SearchBar {...this.props} />
        </header>
        {resultList.categories == undefined ? (
          <div className="col d-flex justify-content-center">
            <div className="cover-screen">
              No results for <b>{params.get("search")}</b>.
            </div>
          </div>
        ) : (
          <div>
            <div className="col d-flex justify-content-center">
              <ol className="breadcrumb bg-transparent center">
                {resultList.categories.map(cat =>
                  cat.map(item => (
                    <li className="breadcrumb-item">{item.name}</li>
                  ))
                )}
              </ol>
            </div>
            {resultList.items.slice(0, 5).map(item => (
              <div className="card-product">
                <SingleProduct
                  title={item.title}
                  imgUrl={item.picture}
                  price={item.price.amount}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Products;
