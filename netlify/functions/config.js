const AWS = require('aws-sdk');
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const REGION = process.env.REGION;


// Set a region to interact with (make sure it's the same as the region of your table)
AWS.config.update({ region: REGION, accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY });

// Create the Document Client interface for DynamoDB
const ddbDocumentClient = new AWS.DynamoDB.DocumentClient();

module.exports = ddbDocumentClient;
