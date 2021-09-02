import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { organisationsService, usersService } from '../../services'
import { apiResponse } from '../../utils'

export const PER_PAGE = 10

export const initialState = {
  initialed: 'pending',
  isLoading: false,
  isUpdatingOrganisationUsersList: false,
  isCreatingOrUpdatingUser: false,
  isCreatingOrganisation: false,
  isShowingUserFormModal: false,
  isShowingOrganisationFormModal: false,
  organisations: [],
  selectedOrganisation: {},
  selectedUser: {},
  usersQuery: {
    limit: PER_PAGE,
    order: 'first',
    pageBreakValue: 0
  },
  organisationUsersList: {
    data: [],
    perPage: PER_PAGE,
    hasNextPage: false,
    hasPreviousPage: false
  }
}

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
        selectedOrganisation,
        query: initialState.usersQuery,
        data: users,
        perPage: PER_PAGE
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
      selectedOrganisation,
      query,
      data: users,
      perPage: PER_PAGE
    })
  }
)

export const createOrUpdateOrganisationUser = createAsyncThunk(
  'app/createOrUpdateOrganisationUser',
  async (payload, thunkAPI) => {
    const selectedOrganisationId = (thunkAPI.getState()).app.selectedOrganisation.id

    if (!payload.id)
      return await usersService.createOrganisationUser({ organisationId: selectedOrganisationId, payload })
    return await usersService.updateOrganisationUser({ organisationId: selectedOrganisationId, payload })
  }
)

export const deleteOrganisationUser = createAsyncThunk(
  'app/deleteOrganisationUser',
  async (userId, thunkAPI) => {
    const selectedOrganisationId = (thunkAPI.getState()).app.selectedOrganisation.id
    return await usersService.deleteOrganisationUser({ organisationId: selectedOrganisationId, userId })
  }
)

export const getAllOrganisations = createAsyncThunk(
  'app/getAllOrganisations',
  async () => await organisationsService.getAllOrganisations()
)

export const createOrganisation = createAsyncThunk(
  'app/createOrganisation',
  async payload => await organisationsService.createOrganisation(payload)
)

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedOrganisation: (state, action) => {
      state.selectedOrganisation = action.payload
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },
    toggleUserFormModal: (state, action) => {
      state.isShowingUserFormModal = action.payload
    },
    toggleOrganisationFormModal: (state, action) => {
      state.isShowingOrganisationFormModal = action.payload
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
      state.usersQuery.order = action.meta.arg.order || initialState.usersQuery.order
      state.usersQuery.pageBreakValue = action.meta.arg.pageBreakValue || initialState.usersQuery.pageBreakValue
    })
    builder.addCase(getOrganisationUsersList.fulfilled, (state, action) => {
      state.organisationUsersList = action.payload
      state.isUpdatingOrganisationUsersList = false
    })
    builder.addCase(getOrganisationUsersList.rejected, state => {
      state.isUpdatingOrganisationUsersList = false
    })

    builder.addCase(createOrUpdateOrganisationUser.pending, (state, action) => {
      state.isCreatingOrUpdatingUser = true
    })
    builder.addCase(createOrUpdateOrganisationUser.fulfilled, (state, action) => {
      state.isCreatingOrUpdatingUser = false
    })
    builder.addCase(createOrUpdateOrganisationUser.rejected, state => {
      state.isCreatingOrUpdatingUser = false
    })
    builder.addCase(deleteOrganisationUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteOrganisationUser.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(deleteOrganisationUser.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(createOrganisation.pending, (state, action) => {
      state.isCreatingOrganisation = true
    })
    builder.addCase(createOrganisation.fulfilled, (state, action) => {
      state.isCreatingOrganisation = false
    })
    builder.addCase(createOrganisation.rejected, state => {
      state.isCreatingOrganisation = false
    })

    builder.addCase(getAllOrganisations.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllOrganisations.fulfilled, (state, action) => {
      state.organisations = action.payload
      state.isLoading = false
    })
    builder.addCase(getAllOrganisations.rejected, state => {
      state.isLoading = false
    })
  }
})

export const {
  toggleOrganisationFormModal,
  toggleUserFormModal,
  setSelectedOrganisation,
  setSelectedUser
} = appSlice.actions

export default appSlice.reducer
