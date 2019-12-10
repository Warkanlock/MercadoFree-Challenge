import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import "./DetailProduct.css";

const API = "http://localhost:8080/api/items/";

class DetailProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailItem: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.searchDetailItem();
  }

  searchDetailItem = () => {
    const id = this.props.match.params.id;

    fetch(`${API}${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          detailItem: data,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { detailItem, isLoading } = this.state;

    if (isLoading) {
      return (
        <>
          <div>
            <SearchBar {...this.props} />
          </div>
          <h4>Loading, please wait...</h4>
        </>
      );
    }
    return (
      <div>
        <header>
          <SearchBar {...this.props} />
        </header>
        <div>
          <Breadcrumb resultList={detailItem}></Breadcrumb>
          {console.log(detailItem)}
          <div className="col d-flex justify-content-center">
            <div
              className="card mb-1 card-detail"
              style={{
                width: "900px",
                height: "700px",
                padding: "10px 10px 10px 10px"
              }}
            >
              <div className="row no-gutters">
                <div className="col-4">
                  <img src={detailItem.item.picture} className="card-img" />
                </div>
                <div className="col-8">
                  <div className="col-12">
                    <div className="card-body">
                      <h5 className="card-title left-title">
                        <b>{detailItem.item.price.amount} $</b>
                      </h5>
                      <h3 className="card-text left-title">
                        {detailItem.item.title}
                      </h3>
                      <p className="card-text left-title">
                        {detailItem.item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailProduct;
