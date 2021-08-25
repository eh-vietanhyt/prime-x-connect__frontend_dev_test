import { http } from '../utils'

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
