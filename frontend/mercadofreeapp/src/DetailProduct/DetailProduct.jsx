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
            <div className="card-rectangle">
              <div className="row">
                <div className="left-padding-pic">
                  <div className="col-4">
                    <img
                      src={detailItem.item.picture}
                      className="img-fluid size-img"
                    ></img>
                  </div>
                  <div className="col-8">
                    <div className="text-center">
                      <div className="row">
                        <div className="col-12">
                          <div className="left-title condition">
                            {detailItem.item.condition == "new" ? (
                              <div>Producto Nuevo</div>
                            ) : (
                              <div>Producto Usado</div>
                            )}
                          </div>
                          <div className="left-title card-title-name">
                            <b>{detailItem.item.title}</b>
                          </div>
                          <h3 className="left-title card-title-price">
                            {detailItem.item.price.amount} $
                          </h3>
                          <div className="text-right">
                            <button
                              type="button"
                              className="btn btn-primary center-button"
                            >
                              Comprar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="detail">
                <div className="description-title">
                  Descripcion del Producto
                </div>
                <div className="description-text">
                  {detailItem.item.description}
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
