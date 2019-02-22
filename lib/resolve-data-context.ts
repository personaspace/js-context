///  <reference path="./interfaces.ts" />
const resolveDataContext = (data: any, context: ContextInterface, root: any = data): any => {
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

const resolveRootReference = (data: any, root: any = data) => {
  const rootItem = data.substr(2)
  if (root[rootItem]) return root[rootItem]

  return data
}

export default resolveDataContext
