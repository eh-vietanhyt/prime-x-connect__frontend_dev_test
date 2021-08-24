import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

import Col from 'react-bootstrap/Col'

import { actions } from '../state_management/actions'

import OrganisationAsMenuItem from '../components/OrganisationAsMenuItem'

const LeftSidebar = ({
  organisations,
  selectedOrganisation,
  dispatch
}) => {
  const onSetSelectedOrganisation = organisation => dispatch(actions.setSelectedOrganisation(organisation))

  return (
    <Col xs={12} md={3} className="LeftSidebar">
      <div className="ListOrganisations">
        {organisations.map((organisation, index) => (
          <OrganisationAsMenuItem
            key={index}
            isSelected={selectedOrganisation.id === organisation.id}
            organisation={organisation}
            onSelectOrganisation={onSetSelectedOrganisation}
          />
        ))}
      </div>
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
