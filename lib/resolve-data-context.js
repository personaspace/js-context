const resolveDataContext = (data, context) => {
  if (typeof data === 'string') {
    const keys = Object.keys(context)
    for (let key of keys) {
      if (data.indexOf(key) === 0) {
        return `${context[key]}${data.substr(key.length)}`
      }
    }
    return data
  } else if (Array.isArray(data)) {
    return data.map(d => resolveDataContext(d, context))
  } if (typeof data !== 'object') {
    return data
  }
  const resolvedData = {}
  Object.keys(data).map(key => {
    const resolvedKey = resolveDataContext(key, context)
    resolvedData[resolvedKey] = data[key]
    return resolvedKey
  }).forEach(key => {
    resolvedData[key] = resolveDataContext(resolvedData[key], context)
  })

  return resolvedData
}

module.exports = resolveDataContext
