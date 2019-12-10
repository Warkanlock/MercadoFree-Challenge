///
/// Made by Ignacio Brasca
///

const transformInto = require("./jsonUtils.js");
const makeRequestAsync = require("./jsonUtils.js");
const express = require("express");
var cors = require("cors");

const app = express();

//To prevent CORS errors
app.use(cors());

var port = process.env.PORT || 8080;
var endpoints = {
    search: 'https://api.mercadolibre.com/sites/MLA/search?q=',
    itemDesc: 'https://api.mercadolibre.com/items/',
    categories: 'https://api.mercadolibre.com/categories/'
}

app.get("/api/items", (req, res) => {
    const query = req.query.q;
    var items = [];
    makeRequestAsync.makeRequestAsync(endpoints['search'], query).then(
        data => {
            items = data;
            res.send((transformInto.transformInto("result", items)));
        }
    ).catch(
        err => {
            console.log("ERROR:" + err);
        }
    );
    console.log(`Response Status -> ${res.statusCode}`)
});

app.get("/api/items/:id", (req, res) => {
    const idToFetch = req.params.id;

    makeRequestAsync.makeRequestAsync(endpoints['itemDesc'], idToFetch).then(
        data => {
            items = data;
            dataToSend = transformInto.transformInto("itemDesc", items)
            categorieId = items['category_id']
            makeRequestAsync.makeRequestAsync(endpoints['categories'], categorieId).then(
                cat => {
                    dataToSend['categories'] = cat['path_from_root'];
                    if (dataToSend.status == 404) {
                        res.sendStatus(404);
                    }
                    res.send(dataToSend);
                }
            )
        }
    ).catch(
        err => {
            console.log("ERROR:" + err);
        }
    );
    console.log(`Response Status -> ${res.statusCode}`)
});

app.listen(port, () => {
    console.log(`Server State: Running at localhost:${port}`);
});