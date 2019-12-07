import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
import Products from "./Products/Products";
import DetailProduct from "./DetailProduct/DetailProduct";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'

function App() {
  return (
    <div className="app-global">
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />}
          />

          <Route exact path="/items" render={(props) => <Products {...props} />}
          />

          <Route path="/items/:id" render={(props) => <DetailProduct {...props} />}
          />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
