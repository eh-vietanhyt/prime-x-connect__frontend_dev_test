import React from 'react'
import propTypes from 'prop-types'
import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'

import { ButtonGroupWrapper } from '../../share/components'
import { userRowActions, getUserOrganisationFeaturesTxt } from '../helpers'

import { actions } from '../state_management/actions'

/* eslint no-debugger: "off" */
/* eslint no-console: "off" */
const UsersTable = ({
  isUpdatingOrganisationUsersList,
  organisationUsersList: {
    data: users,
    hasNextPage,
    hasPreviousPage,
    total
  },
  usersQuery,

  dispatch
}) => {
  const onGoToPrevPage = async () => {
    await dispatch(actions.getOrganisationUsersList({
      order: 'last',
      limit: 10,
      pageBreakValue: users[0].createdAt - 1
    }))
  }

  const onGoToNextPage = async () => {
    await dispatch(actions.getOrganisationUsersList({
      order: 'first',
      limit: 10,
      pageBreakValue: users[9].createdAt + 1
    }))
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
        {users.map((user, indexUser) => (
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
              <ButtonGroupWrapper buttons={userRowActions({user, usersQuery, dispatch})} />
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <div
          className="btn-group"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={!hasPreviousPage || isUpdatingOrganisationUsersList}
            onClick={onGoToPrevPage}
          >
            Prev
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={!hasNextPage || isUpdatingOrganisationUsersList}
            onClick={onGoToNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}

UsersTable.propTypes = {
  isUpdatingOrganisationUsersList: propTypes.bool,
  organisationUsersList: propTypes.object,
  usersQuery: propTypes.object,
  dispatch: propTypes.func
}

export default connect(state => ({
  ...state.app
}))(UsersTable)
