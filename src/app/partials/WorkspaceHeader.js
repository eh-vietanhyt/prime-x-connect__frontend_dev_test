import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'

const WorkspaceHeader = ({
  selectedOrganisation,
  dispatch
}) => {
  return (
    <Navbar className="WorkspaceHeader" sticky="top">
      <h2>{selectedOrganisation.name}</h2>
      <Button variant="success">Add User</Button>
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
