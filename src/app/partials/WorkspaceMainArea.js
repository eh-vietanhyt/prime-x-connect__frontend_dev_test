import React from 'react'
import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'

// import { actions } from '../state_management/actions'

/* eslint no-debugger: "off" */
/* eslint no-console: "off" */
/* eslint react/prop-types: "off" */
const WorkspaceMainArea = ({
  organisationUsersList: {
    data: users
  },

  dispatch
}) => (
  <div className="ListUser">
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
        {(users || []).map((user, indexUser) => (
          <tr key={indexUser}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.roles}</td>
            <td>{user.organisation}</td>
            <td>
              {
                user.organisationFeatures
                  ? user.organisationFeatures.map((i) => i.label).join(', ')
                  : ''
              }
            </td>
            <td>{user.country}</td>
            <td className="text-end">
              <button
                type="button"
                className="btn btn-sm btn-primary me-1"
                // onClick={() => showUserModal(user)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                // onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

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
}))(WorkspaceMainArea)
