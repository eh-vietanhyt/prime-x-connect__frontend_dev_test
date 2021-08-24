import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { organisationsService, usersService } from '../../services'
import { apiResponse } from '../../utils'

const PER_PAGE = 10

export const initialState = {
  initialed: 'pending',
  isLoading: false,
  isUpdatingOrganisationUsersList: false,
  isCreatingOrUpdatingUser: false,
  organisations: [],
  selectedOrganisation: {},
  usersQuery: {
    limit: PER_PAGE,
    order: 'first',
    pageBreakValue: 0
  },
  organisationUsersList: {
    data: [],
    perPage: PER_PAGE,
    hasNextPage: false,
    hasPreviousPage: false,
    total: 0
  }
}

/* eslint no-debugger: "off" */
export const init = createAsyncThunk(
  'app/init',
  async () => {
    const organisations = await organisationsService.getAllOrganisations()
    const selectedOrganisation = (organisations || [])[0] || initialState.selectedOrganisation

    let organisationUsersList = initialState.organisationUsersList

    if (selectedOrganisation.id) {
      const users = await usersService.getListUsersByOrganisationId({
        organisationId: selectedOrganisation.id,
        query: initialState.usersQuery
      })
      organisationUsersList = apiResponse.getFakePaginationResult({
        query: initialState.usersQuery,
        data: users,
        perPage: PER_PAGE,
        total: apiResponse.getTotalOrganisationUsers(selectedOrganisation)
      })
    }

    return {
      organisations,
      selectedOrganisation,
      organisationUsersList
    }
  }
)

export const getOrganisationUsersList = createAsyncThunk(
  'app/getOrganisationUsersList',
  async (query, thunkAPI) => {
    const selectedOrganisation = (thunkAPI.getState()).app.selectedOrganisation

    if (!selectedOrganisation.id) return initialState.organisationUsersList

    const users = await usersService.getListUsersByOrganisationId({
      organisationId: selectedOrganisation.id,
      query
    })
    return apiResponse.getFakePaginationResult({
      query,
      data: users,
      perPage: PER_PAGE,
      total: apiResponse.getTotalOrganisationUsers(selectedOrganisation)
    })
  }
)

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedOrganisation: (state, action) => {
      state.selectedOrganisation = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.initialed = 'pending'
      state.isLoading = true
      state.isUpdatingOrganisationUsersList = true
    })
    builder.addCase(init.fulfilled, (state, action) => {
      state.organisations = action.payload.organisations
      state.selectedOrganisation = action.payload.selectedOrganisation
      state.organisationUsersList = action.payload.organisationUsersList
      state.initialed = 'fulfilled'
      state.isLoading = false
      state.isUpdatingOrganisationUsersList = false
    })
    builder.addCase(init.rejected, state => {
      state.initialed = 'rejected'
      state.isLoading = false
      state.isUpdatingOrganisationUsersList = false
    })

    builder.addCase(getOrganisationUsersList.pending, (state, action) => {
      state.isUpdatingOrganisationUsersList = true
      state.query = action.meta.arg
    })
    builder.addCase(getOrganisationUsersList.fulfilled, (state, action) => {
      state.organisationUsersList = action.payload
      state.isUpdatingOrganisationUsersList = false
    })
    builder.addCase(getOrganisationUsersList.rejected, state => {
      state.isUpdatingOrganisationUsersList = false
    })
  }
})

export const {
  setSelectedOrganisation
} = appSlice.actions

export default appSlice.reducer
