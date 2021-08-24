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
  query,
  data,
  perPage,
  total
}) => ({
  data,
  perPage,
  hasNextPage: (data || []).length === perPage, // mean CAN BE POSSIBLE to have data in the next page
  hasPreviousPage: (data || []).length > 0 && query.pageBreakValue !== 0,
  total
})

export const getTotalOrganisationUsers = selectedOrganisation => (selectedOrganisation.users || []).length
