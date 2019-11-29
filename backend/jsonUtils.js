getAuthor = (name, lastname) => {
    return {
        "name": name,
        "lastname": lastname
    }
}

getCategories = (categories) => {
    let itemsInCategories = [];

    categories.forEach(element => {
        itemsInCategories.push(element['name']);
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