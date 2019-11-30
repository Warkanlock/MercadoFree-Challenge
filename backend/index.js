///
/// Made by Ignacio Brasca
///

const transformInto = require("./jsonUtils.js");
const express = require("express");
const fetch = require("axios");

const app = express();

var port = process.env.PORT || 8080;
var endpoints = {
    search: 'https://api.mercadolibre.com/sites/MLA/search?q=',
    itemDesc: 'https://api.mercadolibre.com/items/'
}

const makeAsyncRequest = async (url, query) => {
    let res = await fetch.get(`${url}${query}`);
    let data = res.data;
    return data;
}

app.get("/api/items", (req, res) => {
    const query = req.query.q;
    var items = [];
    makeAsyncRequest(endpoints['search'], query).then(
        data => {
            items = data;
            res.send((transformInto.transformInto("result", items)));
        }
    ).catch(
        err => {
            console.log("ERROR:" + err);
        }
    );
});

app.get("/api/items/:id", (req, res) => {
    const idToFetch = req.params.id;

    makeAsyncRequest(endpoints['itemDesc'], idToFetch).then(
        data => {
            items = data;
            res.send((transformInto.transformInto("itemDesc", items)));
        }
    ).catch(
        err => {
            console.log("ERROR:" + err);
        }
    );

});

app.listen(port, () => {
    console.log(`Server State: Running at localhost:${port}`);
});