export const transformApiResponseDataToArray = data => {
  const output = []
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const entity = ({
        ...data[key],
        id: key
      })
      // process organisation.users (which returned as an object)
      if (entity.hasOwnProperty('users') && entity.users) {
        entity.users = transformApiResponseDataToArray(entity.users)
      }
      output.push(entity)
    }
  }

  return output
}
