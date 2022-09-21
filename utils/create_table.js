const fs = require('fs');
const AWS = require("aws-sdk");

const createTable = () => {
    AWS.config.update({
        region: "eu-west-1",
        accessKeyId: "fake_access_key",
        secretAccessKey: "fake_Secret_key",
        endpoint: "http://localhost:8000"
    });


    // -----------------------------------------
    // Create the Service interface for dynamoDB
    var dynamodb = new AWS.DynamoDB();

    var params = {
        AttributeDefinitions: [
            {
                AttributeName: "category",
                AttributeType: "S"
            },
            {
                AttributeName: "name",
                AttributeType: "S"
            }
        ],
        KeySchema: [
            {
                AttributeName: "category",
                KeyType: "HASH"
            },
            {
                AttributeName: "name",
                KeyType: "RANGE"
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        TableName: "foodee_local"
    };

    // Create the table.
    dynamodb.createTable(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Table Created", data);
        }
    });
}

createTable()
