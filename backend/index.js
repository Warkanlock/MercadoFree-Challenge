const express = require("express");
const fetch = require("axios");

const app = express();

var port = process.env.PORT || 8080;

const makeAsyncRequest = async (query) => {
    let res = await fetch.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
    let data = res.data;
    return data;
}

app.get("/api/items", (req, res) => {
    const query = req.query.q;
    makeAsyncRequest(query).then(
        data => {
            console.log(data)
            res.send(data);
        }
    );
});

app.listen(port, () => {
    console.log("Server State: Running");
});