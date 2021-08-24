import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import { actions } from '../state_management/actions'

const LeftSidebar = ({
  organisations,
  selectedOrganisation,
  dispatch
}) => {
  const onOpenOrganisationFormModal = () => dispatch(actions.toggleOrganisationFormModal(true))
  const onSetSelectedOrganisation = organisation => dispatch(actions.setSelectedOrganisation(organisation))

  return (
    <Col xs={12} md={2} className="LeftSidebar">
      <Nav className="flex-column ListOrganisations">
        {organisations.map((organisation, index) => (
          <Nav.Link
            key={index}
            className="OrganisationItem"
            onClick={() => onSetSelectedOrganisation(organisation)}
            active={selectedOrganisation.id === organisation.id}
          >
            {organisation.name}
          </Nav.Link>
        ))}
        <Button variant="success" onClick={onOpenOrganisationFormModal}>Add a new Organisation</Button>
      </Nav>
    </Col>
  )
}

LeftSidebar.propTypes = {
  organisations: propTypes.array,
  selectedOrganisation: propTypes.object,
  dispatch: propTypes.func
}

export default connect(state => ({
  ...state.app
}))(LeftSidebar)
