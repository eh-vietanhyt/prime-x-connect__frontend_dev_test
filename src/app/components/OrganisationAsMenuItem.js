import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const OrganisationAsMenuItem = ({
  organisation,
  isSelected,
  onSelectOrganisation,
}) =>
  <div
    className={classNames('OrganisationItem', {'Selected': isSelected})}
    onClick={() => onSelectOrganisation(organisation)}
  >
    {organisation.name}
  </div>

OrganisationAsMenuItem.propTypes = {
  organisation: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelectOrganisation: PropTypes.func.isRequired
}

export default OrganisationAsMenuItem
