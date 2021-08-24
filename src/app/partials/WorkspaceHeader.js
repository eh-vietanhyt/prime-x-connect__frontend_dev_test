import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'

import { actions } from '../state_management/actions'

const WorkspaceHeader = ({
  selectedOrganisation,
  dispatch
}) => {
  const onOpenUserFormModal = () => dispatch(actions.toggleUserFormModal(true))
  return (
    <Navbar className="WorkspaceHeader" sticky="top">
      <h2>{selectedOrganisation.name}</h2>
      <Button variant="success" onClick={onOpenUserFormModal}>Add User</Button>
    </Navbar>
  )
}

WorkspaceHeader.propTypes = {
  selectedOrganisation: propTypes.object,
  dispatch: propTypes.func
}

export default connect(state => ({
  ...state.app
}))(WorkspaceHeader)
