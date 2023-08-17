'use strict';
import axios from 'axios'
const secretId = process.env.SECRET_ID;
let secret;
const extensionPort = process.env.PARAMETERS_SECRETS_EXTENSION_HTTP_PORT || 2773


// Uncomment this code and the extension returns a 400, which
// subsequently crashes the runtime
console.log('Fetching outside handler with session token', process.env.AWS_SESSION_TOKEN)
secret = await axios.get(`http://localhost:${extensionPort}/secretsmanager/get?secretId=${secretId}`, {
  headers: {
    'X-Aws-Parameters-Secrets-Token': process.env.AWS_SESSION_TOKEN
  }
})

export async function hello(event, context) {
 
  // Uncomment this code, and this works
  // console.log('Fetching inside handler with session token', process.env.AWS_SESSION_TOKEN)
  // secret = await axios.get(`http://localhost:${extensionPort}/secretsmanager/get?secretId=${secretId}`, {
  //   headers: {
  //     'X-Aws-Parameters-Secrets-Token': process.env.AWS_SESSION_TOKEN
  //   }
  // })

  console.log('secret is', secret)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        secret: secret.data,
        input: event,
      },
      null,
      2
    ),
  };
};
