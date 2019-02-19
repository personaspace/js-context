const makeContextKey = (context, mapTo) => {
  let key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3)
  while (context[key]) {
    key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3)
  }
  context[`${key}:`] = mapTo
  return key
}

const makeContextObject = (data, context) => {
  if (typeof data === 'string') {
    if (data.indexOf('#') === -1) return data
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

  const resolvedData = {}
  Object.keys(data).map(key => {
    const newKey = makeContextObject(key, context)
    resolvedData[newKey] = data[key]
    return newKey
  }).forEach(key => {
    resolvedData[key] = makeContextObject(resolvedData[key], context)
  })

  return resolvedData
}

const makeDataContext = (data, context = { '@:': '#/' }) => {
  const newData = makeContextObject(data, context)

  return {
    data: newData,
    context
  }
}

module.exports = makeDataContext
