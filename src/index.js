const makeSoapRequest = require('./makeSoapRequest')
const express = require('express')
const proxy = require('express-http-proxy')

const app = express()

app.get('/', async function(req, res) {

  const response1 = await makeSoapRequest({ Arg1: 1, Arg2: 2 }, 'AddInteger')

  const response2 = await makeSoapRequest({ zip: '10001' }, 'LookupCity')

  const response3 = await makeSoapRequest({}, 'Mission')

  const response4 = await makeSoapRequest({id: 1}, 'FindPerson')

  console.log({ response1, response2, response3, response4 })
  res.send({response1, response2, response3, response4});
})

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!');
})

