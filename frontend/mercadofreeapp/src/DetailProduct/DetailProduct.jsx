import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';

const API = "http://localhost:8080/api/items/";

class DetailProduct extends Component {
    constructor(props){
        super(props);

        this.state = {
            detailItem : [],
            isLoading : true,
        }
    }

    componentDidMount(){
        this.searchDetailItem();
    }

    searchDetailItem = () => {
        const id = this.props.match.params.id;

        fetch(`${API}${id}`
        ).then(
            response => { return response.json() } 
        ).then(
            data => {
                this.setState({
                    detailItem : data,
                    isLoading : false
                });
            }   
        ).catch(
            err => {
                console.log(err);
            } 
        )
    }

    render() {
        const { detailItem, isLoading } = this.state;

        if(isLoading)
        {
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
                {/* 
                Insertar aqui lista de elementos,
                cada elemento es un producto
                */}
                {console.log(detailItem)}
            </div>
            </div>
        );
    }
}

export default DetailProduct;