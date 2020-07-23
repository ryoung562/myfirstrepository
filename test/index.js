const axios = require('axios')
const assert = require('assert')
var HTMLParser = require('node-html-parser')

const SUT_HOST = process.env.SUT_HOST || 'localhost';

(async function() {
  try {
    const url = `http://${SUT_HOST}`
    console.log(`Reading ${url}`)
    const response = await axios.get(url)

    const root = HTMLParser.parse(response.data)

    console.log(`found html ${root}`)

    const h1 = root.querySelector('h1')

    console.log(`found h1 ${h1}`)

    assert.equal('My awesome server!', h1.text)
  } catch (err) {
    console.log(err.stack)
  }
})()
