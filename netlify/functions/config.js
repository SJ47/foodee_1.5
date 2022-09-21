const AWS = require('aws-sdk');
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const REGION = process.env.REGION;
// const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// Set a region to interact with (make sure it's the same as the region of your table)
// AWS Cloud
AWS.config.update({ region: REGION, accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY });

// Localhost
// AWS.config.update({ region: REGION, accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, endpoint: "http://localhost:8000" });

// Create the Document Client interface for DynamoDB
const ddbDocumentClient = new AWS.DynamoDB.DocumentClient();

module.exports = ddbDocumentClient;
