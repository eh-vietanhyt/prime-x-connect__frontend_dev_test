import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

import UsersTable from './components/UsersTable'
import OrganisationForm from './components/organisation_form/OrganisationForm'
import UserForm from './components/user_form/UserForm'

import { actions } from './state_management/actions'
import { initialState } from './state_management/slice'

const UsersManagement = ({
  selectedOrganisation,

  dispatch
}) => {
  useEffect(() => {
    dispatch(actions.getOrganisationUsersList(initialState.usersQuery))
  }, [selectedOrganisation.id])

  return (
    <div className="ListUser">
      <UsersTable />
      <OrganisationForm />
      <UserForm />
    </div>
  )
}

UsersManagement.propTypes = {
  selectedOrganisation: propTypes.object,
  dispatch: propTypes.func
}

export default connect(state => ({
  ...state.app
}))(UsersManagement)
