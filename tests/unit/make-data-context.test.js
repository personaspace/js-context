/* global intern */
const { registerSuite } = intern.getPlugin('interface.object')
const { assert } = intern.getPlugin('chai')

const { makeDataContext } = require('../../lib')

const testContext = {
  '@:': '#',
  'id:': 'https://schema.personaspace.com/identity#',
  'loc:': 'https://schema.personaspace.com/location#'
}

const testData = {
  'https://schema.personaspace.com/identity#name': 'Eric L. Bentley',
  'https://schema.personaspace.com/identity#emails': [ '#/~12345', '#/~67890' ],
  '~12345': 'ebntly@example.com',
  '~67890': 'e@example.com',
  'https://schema.personaspace.com/identity#address': {
    'https://schema.personaspace.com/location#street': '12345 Main St',
    'https://schema.personaspace.com/location#city': 'Hometown',
    'https://schema.personaspace.com/location#state': 'LA',
    'https://schema.personaspace.com/location#zip': '98765-4321'
  },
  'https://example.com/schema/test#word': 'Hello, world'
}

registerSuite('make-data-context', {
  'resolves data with a context' () {
    const { data, context } = makeDataContext(testData, testContext)
    const id = context['id:']
    const loc = context['loc:']
    const randomKeys = Object.keys(context).filter(key => ['@:', 'id:', 'loc:'].indexOf(key) === -1)

    assert.equal(randomKeys.length, 1)
    const randomKey = randomKeys[0]

    assert.equal(data[`${randomKey}word`], testData['https://example.com/schema/test#word'])
    assert.equal(data['id:name'], testData[`${id}name`])
    assert.equal(data['id:emails'][0], '@:/~12345')
    assert.equal(data['id:emails'][1], '@:/~67890')
    assert.equal(data['id:address']['loc:street'], testData[`${id}address`][`${loc}street`])
    assert.equal(data['id:address']['loc:city'], testData[`${id}address`][`${loc}city`])
    assert.equal(data['id:address']['loc:state'], testData[`${id}address`][`${loc}state`])
    assert.equal(data['id:address']['loc:zip'], testData[`${id}address`][`${loc}zip`])
  }
})
