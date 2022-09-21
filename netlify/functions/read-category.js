const ddbDocumentClient = require("./config")

exports.handler = async function (event, context) {
    const search_category = JSON.parse(event.body)
    const params = {
        KeyConditionExpression: 'category = :category',
        ExpressionAttributeValues: {
            ':category': search_category
        },
        TableName: "foodee",
    };
    try {
        // Get all items in the table
        // const menu_items = await ddbDocumentClient.scan(params).promise()
        const menu_items = await ddbDocumentClient.query(params).promise()
        // console.log(JSON.stringify(menu_items.Items));
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(menu_items.Items)
        }
    } catch (err) {
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: "Please try again later."
        }
    }
}
