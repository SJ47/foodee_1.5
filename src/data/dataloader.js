// Load the AWS SDK for JS
const fs = require("fs");

// -----------------------------------------
// Create the document client interface for DynamoDB
const ddbDocumentClient = require("../../netlify/functions/config")

console.log("Loading menu items data into DynamoDB");

const menuItemData = JSON.parse(fs.readFileSync('menu_items.json', 'utf8'));
menuItemData.forEach(function (menuItem) {
    const params = {
        TableName: "foodee-menu_items",
        Item: {
            "id": menuItem.id,
            "category": menuItem.category,
            "name": menuItem.name,
            "description": menuItem.description,
            "price": menuItem.price,
            "image": menuItem.image,
            "glutenFree": menuItem.glutenFree,
            "vegetarian": menuItem.vegetarian,
            "vegan": menuItem.vegan,
            "alcoholic": menuItem.alcoholic,
            "size": menuItem.size,
            "abv": menuItem.abv,
            "allergins": menuItem.allergins,
        }
    };

    ddbDocumentClient.put(params, function (err, data) {
        if (err) {
            console.error("Error adding menu item: ", menuItem.name);
        } else {
            console.log("Successfully added menu item: ", menuItem.name);
        }
    });
});