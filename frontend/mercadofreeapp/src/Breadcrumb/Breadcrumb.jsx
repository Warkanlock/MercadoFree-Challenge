import React, { Component } from "react";

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col d-flex justify-content-center">
        <ol className="breadcrumb bg-transparent center">
          {this.props.resultList.categories.map(item => (
            <li className="breadcrumb-item">{item.name}</li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Breadcrumb;
