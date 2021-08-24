import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import UsersTable from './components/UsersTable'
import OrganisationForm from './components/organisation_form/OrganisationForm'
import UserForm from './components/user_form/UserForm'

import { actions } from './state_management/actions'

/* eslint no-debugger: "off" */
/* eslint no-console: "off" */
/* eslint react/prop-types: "off" */
/* eslint react-hooks/exhaustive-deps: "off" */
const UsersManagement = ({
  selectedOrganisation,
  organisationUsersList: {
    data: users
  },

  dispatch
}) => {
  useEffect(() => {
    dispatch(actions.getOrganisationUsersList()).then(data => {debugger})
  }, [selectedOrganisation.id])

  return (
    <div className="ListUser">
      <UsersTable />
      <OrganisationForm />
      <UserForm />
    </div>
  )
}

// ListUser.propTypes = {
//   listUsers: PropTypes.array,
//   organisation: PropTypes.object,
//   showUserModal: PropTypes.func,
//   deleteUser: PropTypes.func,
//   canGoPrev: PropTypes.bool,
//   canGoNext: PropTypes.bool,
//   handleGoPrev: PropTypes.func,
//   handleGoNext: PropTypes.func,
//   store: PropTypes.any,
//   dispatch: PropTypes.func
// }

export default connect(state => ({
  ...state.app
}))(UsersManagement)
