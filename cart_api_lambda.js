/* eslint-disable  func-names */
/* eslint-disable  no-console */

const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

const done = response => {
    return {
        statusCode: '200',
        body: JSON.stringify(response),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*'
        }
    }
}

exports.handler = (event, context, callback) => {
    let docClient = new AWS.DynamoDB.DocumentClient();
    let table = "alexa-cart";
    let params = {
      TableName: table,
      ProjectionExpression: "info"
    };

    docClient.scan(params, (err, data) => {
      if(err) {
          callback(err, null);
      } else {
          callback(null, data.Items);
      }
    });
};
