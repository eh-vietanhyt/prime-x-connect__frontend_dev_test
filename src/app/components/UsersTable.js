import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table'

import { ButtonGroupWrapper, Pagination } from '../../share/components'
import { userRowActions, getUserOrganisationFeaturesTxt } from './helpers'

const UsersTable = ({
  isUpdatingOrganisationUsersList,
  organisationUsersList: {
    data: users
  },

  dispatch
}) => {
  if (isUpdatingOrganisationUsersList) {
    return <div>Loading spinner here...</div>
  }

  return (
    <>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Organisation</th>
            <th>Organisation Features</th>
            <th>Country</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            !users.length
              ? (
                <tr>
                  <td colSpan="7">
                    No data
                  </td>
                </tr>
              )
              : users.map((user, indexUser) => (
                <tr key={indexUser}>
                  <td>
                    {user.name}
                  </td>
                  <td>
                    {user.email}
                  </td>
                  <td>
                    {user.roles}
                  </td>
                  <td>
                    {user.organisation}
                  </td>
                  <td>
                    {getUserOrganisationFeaturesTxt(user)}
                  </td>
                  <td>
                    {user.country}
                  </td>
                  <td className="text-end">
                    <ButtonGroupWrapper
                      buttons={userRowActions({ user, dispatch })}
                    />
                  </td>
                </tr>
              ))
          }
        </tbody>
      </Table>
      <Pagination />
    </>
  )
}

UsersTable.propTypes = {
  isUpdatingOrganisationUsersList: propTypes.bool,
  organisationUsersList: propTypes.object,
  dispatch: propTypes.func
}

export default connect(state => ({
  ...state.app
}))(UsersTable)
