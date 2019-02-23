///  <reference path="./interfaces.ts" />
export default (data: DataInterface, context:ContextInterface = {}): DataContextInterface => {
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
