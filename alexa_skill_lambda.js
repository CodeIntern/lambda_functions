/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const AWS = require("aws-sdk");
const uuid = require("uuid");

AWS.config.update({
  region: "us-east-1"
});

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'What do you want to add to cart?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
  handle(handlerInput) {
    const speechText = 'Hello World Test!';

    let docClient = new AWS.DynamoDB.DocumentClient();
    let table = "alexa-cart";
    let params = {
      TableName: table,
      ProjectionExpression: "info"
    };

    docClient.scan(params, (err, data) => {
      if(err) {
        console.log("Error adding", err);
      } else {
        console.log("Success add", data);
      }
    });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const AddHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'Add';
  },
  handle(handlerInput) {
    const speechText = 'We do not have that item :(';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Add Test', speechText)
      .getResponse();
  },
};

const AddIphoneHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AddIphone';
  },
  handle(handlerInput) {
    const speechText = 'Iphone added!';

    let docClient = new AWS.DynamoDB.DocumentClient();
    let table = "alexa-cart";
    let params = {
      TableName: table,
      Item: {
        "id" : uuid.v1(),
        "info": "iphone"
      }
    };

    docClient.put(params, (err, data) => {
      if(err) {
        console.log("Error adding", err);
      } else {
        console.log("Success add", data);
      }
    });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Add Iphone', speechText)
      .getResponse();
  },
};

const AddKindleHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AddKindle';
  },
  handle(handlerInput) {
    const speechText = 'Kindle added!';

    let docClient = new AWS.DynamoDB.DocumentClient();
    let table = "alexa-cart";
    let params = {
      TableName: table,
      Item: {
        "id" : uuid.v1(),
        "info": "kindle"
      }
    };

    docClient.put(params, (err, data) => {
      if(err) {
        console.log("Error adding", err);
      } else {
        console.log("Success add", data);
      }
    });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Add Kindle', speechText)
      .getResponse();
  },
};

const AddIpadHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AddIpad';
  },
  handle(handlerInput) {
    const speechText = 'Ipad added!';

    let docClient = new AWS.DynamoDB.DocumentClient();
    let table = "alexa-cart";
    let params = {
      TableName: table,
      Item: {
        "id" : uuid.v1(),
        "info": "ipad"
      }
    };

    docClient.put(params, (err, data) => {
      if(err) {
        console.log("Error adding", err);
      } else {
        console.log("Success add", data);
      }
    });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Add Ipad', speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    AddHandler,
    AddIphoneHandler,
    AddKindleHandler,
    AddIpadHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
