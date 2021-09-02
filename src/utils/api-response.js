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
  perPage
}) => {
  const firstOrganisationUser = getFirstOrganisationUser(selectedOrganisation)

  return ({
    data,
    perPage,
    hasNextPage: (data || []).length === perPage, // mean CAN BE POSSIBLE to have data in the next page
    hasPreviousPage: query.pageBreakValue !== 0 && (!(data || []).length || (data)[0].id !== firstOrganisationUser.id)
  })
}

export const getFirstOrganisationUser = selectedOrganisation => {
  const users = selectedOrganisation.users || {}
  return ({
    id: Object.keys(users)[0],
    ...users[Object.keys(users)[0]]
  })
}
