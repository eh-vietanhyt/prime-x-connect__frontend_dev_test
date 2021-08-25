export const getPaginatedData = ({
  data,
  perPage,
  currentPage
}) => {
  const total = (data || []).length
  const totalPages = Math.ceil(total / perPage)
  const startIdx = (currentPage - 1) * perPage
  const paginatedData = data.slice(startIdx, startIdx + perPage)
  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  return ({
    data: paginatedData,
    perPage,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    total
  })
}
