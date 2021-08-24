import { http, apiResponse } from '../utils'

export const getListUsersByOrganisationId = async ({
  organisationId,
  query: {
    limit,
    order,
    pageBreakValue
  }
}) => {
  const params = {
    orderBy: '"createdAt"', // should be an variable if we implement sort user feature
    limitToFirst: order === 'first' ? limit : undefined,
    startAt: order === 'first' ? pageBreakValue : undefined,
    limitToLast: order === 'last' ? limit : undefined,
    endAt: order === 'last' ? pageBreakValue : undefined
  }

  const { data } = await http.get(`/organisations/${organisationId}/users.json`, { params })
  return apiResponse.transformApiResponseDataToArray(data)
}

export const createOrganisationUser = async ({
  organisationId,
  payload
}) => {
  payload.createdAt = new Date().getTime()
  return await http.post(`/organisations/${organisationId}/users.json`, payload)
}

export const updateOrganisationUser = async ({
  organisationId,
  payload
}) =>
  await http.put(`/organisations/${organisationId}/users/${payload.id}.json`, payload)

export const deleteOrganisationUser = async ({
  organisationId,
  userId
}) =>
  await http.delete(`/organisations/${organisationId}/users/${userId}.json`)
