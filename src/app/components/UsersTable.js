import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table'

import { ButtonGroupWrapper, Pagination } from '../../share/components'
import { userRowActions, getUserOrganisationFeaturesTxt } from './helpers'

import { actions } from '../state_management/actions'

import { PER_PAGE } from '../state_management/slice'

const UsersTable = ({
  isUpdatingOrganisationUsersList,
  organisationUsersList: {
    data: users,
    hasNextPage,
    hasPreviousPage
  },
  usersQuery,

  dispatch
}) => {
  const onGoToPrevPage = async () => {
    await dispatch(actions.getOrganisationUsersList({
      order: 'last',
      limit: PER_PAGE,
      pageBreakValue: users[0].createdAt - 1
    }))
  }

  const onGoToNextPage = async () => {
    await dispatch(actions.getOrganisationUsersList({
      order: 'first',
      limit: PER_PAGE,
      pageBreakValue: users[users.length - 1].createdAt + 1
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
                <ButtonGroupWrapper
                  buttons={userRowActions({ user, usersQuery, dispatch })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        isLoading={isUpdatingOrganisationUsersList}
        onGoToPrevPage={onGoToPrevPage}
        onGoToNextPage={onGoToNextPage}
      />
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
