export const transformApiResponseDataToArray = data => {
  const output = []
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      output.push({
        ...data[key],
        id: key
      })
    }
  }

  return output
}

export const getFakePaginationResult = ({
  selectedOrganisation,
  query,
  data,
  perPage,
  total
}) => {
  const firstOrganisationUser = getFirstOrganisationUser(selectedOrganisation)

  return ({
    data,
    perPage,
    hasNextPage: (data || []).length === perPage, // mean CAN BE POSSIBLE to have data in the next page
    hasPreviousPage: (data || []).length > 0 && (data || [])[0].id !== firstOrganisationUser.id,
    total
  })
}

export const getTotalOrganisationUsers = selectedOrganisation => Object.keys(selectedOrganisation.users || {}).length

export const getFirstOrganisationUser = selectedOrganisation => {
  const users = selectedOrganisation.users || {}
  return users[Object.keys(users)[0]]
}
