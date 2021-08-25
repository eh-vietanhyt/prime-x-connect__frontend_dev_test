import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'

import { ButtonGroupWrapper } from '../../share/components'
import { userRowActions, getUserOrganisationFeaturesTxt } from './helpers'

import { actions } from '../state_management/actions'

const UsersTable = ({
  selectedOrganisation,
  organisationUsersList: {
    data: users,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    totalPages
  },

  dispatch
}) => {
  const goToPage = page => {
    dispatch(actions.goToPage({
      selectedOrganisation,
      page
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
                  buttons={userRowActions({ user, dispatch })}
                />
              </td>
            </tr>
          ))}
          {
            !users.length
              ? (
                <tr>
                  <td colSpan="7">
                    No data
                  </td>
                </tr>
              )
              : null
          }
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev disabled={!hasPreviousPage} onClick={() => goToPage(currentPage - 1)} />
        {
          [...Array(totalPages).keys()].map(idx => (
            <Pagination.Item
              key={idx}
              active={currentPage === idx + 1}
              onClick={() => goToPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))
        }
        <Pagination.Next disabled={!hasNextPage} onClick={() => goToPage(currentPage + 1)} />
      </Pagination>
    </>
  )
}

UsersTable.propTypes = {
  selectedOrganisation: propTypes.object,
  organisationUsersList: propTypes.object,
  dispatch: propTypes.func
}

export default connect(state => ({
  ...state.app
}))(UsersTable)
