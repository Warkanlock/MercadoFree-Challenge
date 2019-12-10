import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SingleProduct.css";

class SingleProduct extends Component {
  render() {
    return (
      <div className="col d-flex justify-content-center">
        <div
          className="card mb-1"
          style={{
            width: "500px",
            height: "200px",
            padding: "10px 10px 10px 10px"
          }}
        >
          <div className="row no-gutters">
            <div className="col-4">
              <img src={this.props.imgUrl} className="card-img" />
            </div>
            <div className="col-8">
              <div className="col-12">
                <div className="card-body">
                  <h5 className="card-title left-title">
                    <b>{this.props.price} $</b>
                  </h5>
                  <Link to={"/items/" + this.props.id}>
                    <p className="card-text left-title">{this.props.title}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
