import { http, apiResponse } from '../utils'

export async function getAllOrganisations () {
  const {data} = await http.get('/organisations.json')
  return apiResponse.transformApiResponseDataToArray(data)
}

export async function createOrganisation (payload) {
  payload.createdAt = new Date().getTime()
  return await http.post('/organisations.json', payload)
}
