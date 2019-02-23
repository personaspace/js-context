/**
 * An object representing the context that data should be resolved or built.
 * A context is used in an attempt to reduce the file size by parameterizing schema URLs up to the hash.
 */
export interface ContextInterface {
    /**
     * A key/value pair representing the parameterized schema URL (key) mapping to its full schema URL (value).
     */
    [key: string]: string
}

/**
 * An object representing the data of a resource. It can represent either a resolved or contextualized data object.
 */
export interface DataInterface {
    /**
     * A key/value pair representing a property value identified by its schema URL, parameterized (contextual) or full (resolved).
     */
    [key: string]: any
}

/**
 * An object representing a contextualized data object, with the context ([[ContextInterface]]) it was created in.
 */
export interface DataContextInterface {
    /**
     * The data of a resource that was contextualized by the context stored in the property `context`.
     */
    data: DataInterface,
    /**
     * The context that the data in the property `data` was contextualized in.
     */
    context: ContextInterface
}

/**
 * Takes resource data and a context and contextualizes the data, adding random contexts for schema URLs not mapped, and
 * returns the contextualized resource data and the complete context the data was contextualized with as a [[DataContextInterface]].
 *
 * **Example**
 * ```ts
 * import { makeDataContext } from '@personaspace/context'
 *
 * const data = {
 *  'https://schema.personaspace.com/identity#name': 'Eric L. Bentley',
 *  'https://schema.personaspace.com/identity#id': 9467815246,
 *  'https://schema.personaspace.com/identity#hasEmails': true,
 *  'https://schema.personaspace.com/identity#emails': [ '#/~12345', '#/~67890' ],
 *  'https://schema.personaspace.com/identity#url': '#/profile',
 *  '~12345': 'ebntly@example.com',
 *  '~67890': 'e@example.com',
 *  'https://schema.personaspace.com/identity#address': {
 *      'https://schema.personaspace.com/location#street': '12345 Main St',
 *     'https://schema.personaspace.com/location#city': 'Hometown',
 *     'https://schema.personaspace.com/location#state': 'LA',
 *     'https://schema.personaspace.com/location#zip': '98765-4321'
 *  },
 *  'https://example.com/schema/test#word': 'Hello, world'
 * }
 *
 * const context = {
 *  'id:': 'https://schema.personaspace.com/identity#',
 *  'loc:': 'https://schema.personaspace.com/location#'
 * }
 *
 * console.log(makeDataContext(data, context))
 * //   Example result
 * //   {
 * //       data: {
 * //           'id:name': 'Eric L. Bentley',
 * //           'id:id': 9467815246,
 * //           'id:hasEmails': true,
 * //           'id:emails': [ '#/~12345', '#/~67890' ],
 * //           'id:url': '#/profile',
 * //           '~12345': 'ebntly@example.com',
 * //           '~67890': 'e@example.com',
 * //           'id:address': {
 * //               'loc:street': '12345 Main St',
 * //               'loc:city': 'Hometown',
 * //               'loc:state': 'LA',
 * //               'loc:zip': '98765-4321'
 * //           },
 * //           'xyh:word': 'Hello, world'
 * //       },
 * //       context: {
 * //           'id:': 'https://schema.personaspace.com/identity#',
 * //           'loc:': 'https://schema.personaspace.com/location#',
 * //           'xyh:': 'https://example.com/schema/test#'
 * //       }
 * //   }
 *
 * ```
 * @param data DataInterface The data to contextualize with the `context` object.
 * @param context ContextInterface The context to use to contextualize the `data` with.
 * @returns The data-context object that contains the contextualized data and the context it was created in.
 */
export const makeDataContext = (data: DataInterface, context:ContextInterface = {}): DataContextInterface => {
  const newData = makeContextObject(data, context)

  return {
    data: newData,
    context
  }
}

function makeContextObject (data: any, context: ContextInterface): any {
  if (typeof data === 'string') {
    if (data.indexOf('#') < 3) return data
    let index = data.indexOf('#')
    let prefix = data.substr(0, index + 1)
    let prop = data.substr(index + 1)

    for (let key in context) {
      if (context[key] === prefix) {
        return `${key}${prop}`
      }
    }

    return `${makeContextKey(context, prefix)}:${prop}`
  } else if (Array.isArray(data)) {
    return data.map(d => makeContextObject(d, context))
  } else if (typeof data !== 'object') {
    return data
  }

  const resolvedData: DataInterface = {}
  Object.keys(data).map(key => {
    const newKey = makeContextObject(key, context)
    resolvedData[newKey] = data[key]
    return newKey
  }).forEach(key => {
    resolvedData[key] = makeContextObject(resolvedData[key], context)
  })

  return resolvedData
}

function makeContextKey (context: ContextInterface, mapTo: string): string {
  let key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3)
  /* istanbul ignore if Cannot test randomness */
  if (context[key]) {
    return makeContextKey(context, mapTo)
  }
  context[`${key}:`] = mapTo
  return key
}

const resolveRootReference = (data: any, root: any = data) => {
  const rootItem = data.substr(2)
  if (root[rootItem]) return root[rootItem]

  return data
}

/**
 * Takes contextualized resource data and a context and resolves the data to use fulle schema URLs.
 *
 * **Example**
 * ```ts
 * import { resolveDataContext } from '@personaspace/context'
 *
 * const data = {
 *  'id:name': 'Eric L. Bentley',
 *  'id:id': 9467815246,
 *  'id:hasEmails': true,
 *  'id:emails': [ '#/~12345', '#/~67890' ],
 *  'id:url': '#/profile',
 *  '~12345': 'ebntly@example.com',
 *  '~67890': 'e@example.com',
 *  'id:address': {
 *      'loc:street': '12345 Main St',
 *      'loc:city': 'Hometown',
 *      'loc:state': 'LA',
 *      'loc:zip': '98765-4321'
 *  },
 *  'kwn:word': 'Hello, world'
 * }
 *
 * const context = {
 *  'id:': 'https://schema.personaspace.com/identity#',
 *  'loc:': 'https://schema.personaspace.com/location#',
 *  'kwn:': 'https://example.com/schema/test#'
 * }
 *
 * console.log(resolveDataContext(data, context))
 *
 * //   Example result
 * //   {
 * //       'https://schema.personaspace.com/identity#name': 'Eric L. Bentley',
 * //       'https://schema.personaspace.com/identity#id': 9467815246,
 * //       'https://schema.personaspace.com/identity#hasEmails': true,
 * //       'https://schema.personaspace.com/identity#emails': [
 * //           'ebntly@example.com',
 * //           'e@example.com'
 * //       ],
 * //       'https://schema.personaspace.com/identity#url': '#/profile',
 * //       '~12345': 'ebntly@example.com',
 * //       '~67890': 'e@example.com',
 * //       'https://schema.personaspace.com/identity#address': {
 * //           'https://schema.personaspace.com/location#street': '12345 Main St',
 * //           'https://schema.personaspace.com/location#city': 'Hometown',
 * //           'https://schema.personaspace.com/location#state': 'LA',
 * //           'https://schema.personaspace.com/location#zip': '98765-4321'
 * //       },
 * //       'https://example.com/schema/test#word': 'Hello, world'
 * //   }
 *
 * ```
 * @param data DataInterface The contextualized data to resolve.
 * @param context ContextInterface The context to use to resolve the data with.
 * @param root DataInterface The root data that reference data may be stored.
 * @returns The resolved data.
 */
export const resolveDataContext = (data: any, context: ContextInterface, root: any = data): any => {
  if (typeof data === 'string') {
    if (data.indexOf('#/') === 0) {
      return resolveRootReference(data, root)
    }
    const keys = Object.keys(context)
    for (let key of keys) {
      if (data.indexOf(key) === 0) {
        return `${context[key]}${data.substr(key.length)}`
      }
    }
    return data
  } else if (Array.isArray(data)) {
    return data.map(d => resolveDataContext(d, context, root))
  } if (typeof data !== 'object') {
    return data
  }
  const resolvedData: DataInterface = {}
  Object.keys(data).map(key => {
    const resolvedKey = resolveDataContext(key, context, root)
    resolvedData[resolvedKey] = data[key]
    return resolvedKey
  }).forEach(key => {
    resolvedData[key] = resolveDataContext(resolvedData[key], context, root)
  })

  return resolvedData
}
