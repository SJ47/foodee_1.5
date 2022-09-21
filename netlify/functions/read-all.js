const ddbDocumentClient = require("./config")

exports.handler = async function (event, context) {
    const params = {
        TableName: "foodee",
    };

    try {
        // Get all items in the table
        const menu_items = await ddbDocumentClient.scan(params).promise()
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
