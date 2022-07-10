const soap = require("soap")
let request = require('request');

const PROXY_URL = 'http://localhost:8080/'

let request_with_defaults = request.defaults({'proxy': PROXY_URL, 'timeout': 5000, 'connection': 'keep-alive'});
let soap_client_options = {'request': request_with_defaults}

const makeSoapRequest = async (payload, operation) => {
  //const arg0 = payload
  console.log('\n')
  console.log(`==============  ${operation}  ===============`)
  try {
    // console.log({ payload })
    const client = await soap.createClientAsync('https://www.crcind.com/csp/samples/SOAP.Demo.CLS?WSDL=1');
    client.log = (any) => console.log(any)
    return await new Promise((resolve, reject) => {
      client[operation]({ ...payload }, (err, result) => {
        console.log('\n')
        console.log(`==============  Request  ===============`)
        console.log('\n')
        console.log(client.lastRequest)
        console.log('\n')
        console.log(`==============  Response  ===============`)
        console.log('\n')
        console.log(client.lastResponse)
        console.log('\n')
        console.log(`==================================================================================`)
        resolve(result)
      })
    })
  } catch (err) {
    console.log({ err })
    throw err
  }
}

module.exports = makeSoapRequest