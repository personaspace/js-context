/* global intern */
const { registerSuite } = intern.getPlugin('interface.object')
const { assert } = intern.getPlugin('chai')

const { resolveContext } = require('../../lib')

const context = {
  'n:': 'https://schema.personaspace.com/identity#',
  '@:': '#',
  'loc:': 'https://schema.personaspace.com/location#'
}

const data = {
  'n:name': 'Eric L. Bentley',
  'n:emails': ['@:/~12345', '@:/~67890'],
  '~12345': 'ebntly@example.com',
  '~67890': 'e@example.com',
  'n:address': {
    'loc:street': '12345 Main St',
    'loc:city': 'Hometown',
    'loc:state': 'LA',
    'loc:zip': '98765-4321'
  }
}

registerSuite('resolve-data-context', {
  'resolves data with a context' () {
    const d = resolveContext(data, context)
    const id = context['n:']
    const loc = context['loc:']

    assert.equal(d[`${id}name`], data['n:name'])
    assert.equal(d[`${id}emails`][0], '#/~12345')
    assert.equal(d[`${id}emails`][1], '#/~67890')
    assert.equal(d[`${id}address`][`${loc}street`], data['n:address']['loc:street'])
    assert.equal(d[`${id}address`][`${loc}city`], data['n:address']['loc:city'])
    assert.equal(d[`${id}address`][`${loc}state`], data['n:address']['loc:state'])
    assert.equal(d[`${id}address`][`${loc}zip`], data['n:address']['loc:zip'])
  }
})
