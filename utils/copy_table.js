// Run this file locally using "node copy_table"
// Will copy a local downlaoded AWS DynamoDB table to a local table
// for using a local version of DynamoDB

const fs = require('fs');
const AWS = require("aws-sdk");
function addDataToLocal() {
    AWS.config.update({
        region: "eu-west-1",
        accessKeyId: "fake_access_key",
        secretAccessKey: "fake_Secret_key",
        endpoint: "http://localhost:8000"
    });

    var documentClient = new AWS.DynamoDB();

    console.log("Loading menu data into DynamoDB");

    var itemData = JSON.parse(fs.readFileSync('foodee_data.json', 'utf8'));
    itemData.forEach(function (item) {
        // console.log("ITEM: ", item)
        var params = {
            TableName: "foodee_local",
            Item: {
                "category": item.Item.category,
                "name": item.Item.name,
                "size": item.Item.size,
                "vegan": item.Item.vegan,
                "glutenFree": item.Item.glutenFree,
                "alcoholic": item.Item.alcoholic,
                "allergins": item.Item.allergins,
                "vegetarian": item.Item.vegetarian,
                "image": item.Item.image,
                "abv": item.Item.abv,
                "description": item.Item.description,
                "price": item.Item.price,
                "id": item.Item.id,
            }
        };

        documentClient.putItem(params, function (err, data) {
            if (err) {
                console.error("Can't add menu item: ", err);
            } else {
                console.log("Succeeded adding menu item: ", item.Item.name);
            }
        });

    });
}

addDataToLocal();