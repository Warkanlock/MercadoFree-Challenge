const transformInto = require("./jsonUtils.js");
const express = require("express");
const fetch = require("axios");

const app = express();

var port = process.env.PORT || 8080;
var endpointSearch = 'https://api.mercadolibre.com/sites/MLA/search?q=';

const makeAsyncRequest = async (url, query) => {
    let res = await fetch.get(`${url}${query}`);
    let data = res.data;
    return data;
}

app.get("/api/items", (req, res) => {
    const query = req.query.q;
    var items = [];
    makeAsyncRequest(endpointSearch, query).then(
        data => {
            items = data;
            console.log((transformInto.transformInto("result", items)));
            res.send((transformInto.transformInto("result", items)));
        }
    ).catch(
        err => {
            console.log("ERROR:" + err);
        }
    );
});

app.listen(port, () => {
    console.log("Server State: Running");
});