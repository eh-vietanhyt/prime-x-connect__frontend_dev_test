import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { organisationsService, usersService } from '../../services'
import { frontendPagination } from '../../utils'

export const PER_PAGE = 10

/* eslint no-debugger: "off" */
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
  organisationUsersList: {
    data: [],
    perPage: PER_PAGE,
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    total: 0
  }
}

export const init = createAsyncThunk(
  'app/init',
  async (organisationId, thunkAPI) => {
    let selectedOrganisation = (thunkAPI.getState()).app.selectedOrganisation
    const organisations = await organisationsService.getAllOrganisations()

    if (selectedOrganisation.id) {
      selectedOrganisation = (organisations || []).find(org => org.id === selectedOrganisation.id)
    } else {
      selectedOrganisation = (organisations || [])[0] || initialState.selectedOrganisation
    }

    return ({
      organisations,
      selectedOrganisation
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
      state.organisationUsersList = frontendPagination.getPaginatedData({
        data: action.payload.users || [],
        perPage: PER_PAGE,
        currentPage: 1
      })
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },
    toggleUserFormModal: (state, action) => {
      state.isShowingUserFormModal = action.payload
    },
    toggleOrganisationFormModal: (state, action) => {
      state.isShowingOrganisationFormModal = action.payload
    },
    goToPage: (state, action) => {
      state.organisationUsersList = frontendPagination.getPaginatedData({
        data: action.payload.selectedOrganisation.users,
        perPage: PER_PAGE,
        currentPage: action.payload.page
      })
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

      state.organisationUsersList = frontendPagination.getPaginatedData({
        data: action.payload.selectedOrganisation.users,
        perPage: PER_PAGE,
        currentPage: 1
      })

      state.initialed = 'fulfilled'
      state.isLoading = false
      state.isUpdatingOrganisationUsersList = false
    })
    builder.addCase(init.rejected, state => {
      state.initialed = 'rejected'
      state.isLoading = false
      state.isUpdatingOrganisationUsersList = false
    })

    builder.addCase(createOrUpdateOrganisationUser.pending, state => {
      state.isCreatingOrUpdatingUser = true
    })
    builder.addCase(createOrUpdateOrganisationUser.fulfilled, state => {
      state.isCreatingOrUpdatingUser = false
    })
    builder.addCase(createOrUpdateOrganisationUser.rejected, state => {
      state.isCreatingOrUpdatingUser = false
    })
    builder.addCase(deleteOrganisationUser.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteOrganisationUser.fulfilled, state => {
      state.isLoading = false
    })
    builder.addCase(deleteOrganisationUser.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(createOrganisation.pending, state => {
      state.isCreatingOrganisation = true
    })
    builder.addCase(createOrganisation.fulfilled, state => {
      state.isCreatingOrganisation = false
    })
    builder.addCase(createOrganisation.rejected, state => {
      state.isCreatingOrganisation = false
    })

    builder.addCase(getAllOrganisations.pending, state => {
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
  setSelectedUser,
  goToPage
} = appSlice.actions

export default appSlice.reducer
