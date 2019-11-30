///
/// Related to JSON utilities that allows you convert dictionary that comes from MercadoLibre API to JSON's like objects, in order to use in our front-end app.
///

getAuthor = (name, lastname) => {
    return {
        "name": name,
        "lastname": lastname
    }
}

getCategories = (categories) => {
    let itemsInCategories = [];

    categories.forEach(element => {
        itemsInCategories.push(element['path_from_root']);
    });

    return itemsInCategories;
}

getItems = (results) => {
    let itemsReturnedBy = [];

    results.forEach(element => {
        let item = {
            "id": element['id'],
            "title": element['title'],
            "price": {
                "currency": element['currency_id'],
                "amount": element['price'],
                "decimals": element['price'].countDecimals()
            },
            "picture": element['thumbnail'],
            "condition": element['condition'],
            "free_shipping": element['shipping']['free_shipping']
        };

        itemsReturnedBy.push(item);
    });

    return itemsReturnedBy;
}

getItemDesc = (itemDescription) => {
    let item = {};

    item['id'] = itemDescription['id'];
    item['title'] = itemDescription['title'];
    item['price'] = {
        "currency": itemDescription['currency_id'],
        "amount": itemDescription['price'],
        "decimals": itemDescription['price'].countDecimals()
    };
    item['picture'] = itemDescription['thumbnail'];
    item['condition'] = itemDescription['condition'];
    item['free_shipping'] = itemDescription['shipping']['free_shipping'];
    item['sold_quantity'] = itemDescription['sold_quantity'];
    item['description'] = itemDescription['descriptions'];

    return item;
}

const transformIntoFunc = (type, list) => {
    let objectManipulated;

    if (type.length > 0) {
        if (type == "result") {
            let tempObject = {};

            tempObject['author'] = getAuthor("Ignacio", "Brasca");
            tempObject['categories'] = getCategories(list['filters'][0]['values']);
            tempObject['items'] = getItems(list['results']);

            objectManipulated = tempObject;

            return objectManipulated;
        } else if (type == "itemDesc") {
            let tempObject = {};

            tempObject['author'] = getAuthor("Ignacio", "Brasca");
            tempObject['item'] = getItemDesc(list)

            objectManipulated = tempObject;

            return objectManipulated;
        } else {
            console.log('Not implemented Yet!');
        }
    } else {
        return null;
    }
}

Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
}

module.exports = {
    transformInto: transformIntoFunc
};