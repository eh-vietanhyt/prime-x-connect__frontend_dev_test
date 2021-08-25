import React from 'react'

import UsersTable from './components/UsersTable'
import OrganisationForm from './components/organisation_form/OrganisationForm'
import UserForm from './components/user_form/UserForm'

const UsersManagement = () => (
  <div className="ListUser">
    <UsersTable />
    <OrganisationForm />
    <UserForm />
  </div>
)

export default UsersManagement
