# PersonaSpace Context
[![CircleCI](https://circleci.com/gh/personaspace/js-context/tree/master.svg?style=svg)](https://circleci.com/gh/personaspace/js-context/tree/master)
[![codecov](https://codecov.io/gh/personaspace/js-context/branch/master/graph/badge.svg)](https://codecov.io/gh/personaspace/js-context)
[![Known Vulnerabilities](https://snyk.io/test/github/personaspace/js-context/master/badge.svg?targetFile=package.json)](https://snyk.io/test/github/personaspace/js-context/master?targetFile=package.json)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A package for resolving data mapping using context lists. It supports both node.js and browser environments.


## Installation

Install `@personaspace/context` using npm.
```
npm i @personaspace/context
```

## Usage

```js
const { resolveDataContext, makeDataContext } = require('@personaspace/context')

const resource = './ebntly/data/notes/test'
const data = require(`${resource}.json`)['@data']
const context = require(`${resource}.json`)['@context']

const resolved = resolveDataContext(data, context)
const created = makeDataContext(data, {})
//  created.context will be different from the original context

```

## Documentation
Documentation is located at https://personaspace.github.io/js-context. For issues with the documentation, please 
[Create a new issue](https://github.com/personaspace/js-context/issues/new).

## Contributing to PersonaSpace
PersonaSpace is a large project and [contributors](https://github.com/personaspace/js-context/blob/master/CONTRIBUTORS.md) are welcome. Thank you for your support and efforts!

There are a lot of ways to contribute:

* [Create a new issue](https://github.com/personaspace/js-context/issues/new) to report bugs or request features
* [Fix an issue](https://github.com/personaspace/js-context/issues)

Be sure to look at [CONTRIBUTING.md](https://github.com/personaspace/js-context/blob/master/CONTRIBUTING.md).

## License
PersonaSpace is licensed under [the MIT License](https://github.com/personaspace/js-context/blob/master/LICENSE).
