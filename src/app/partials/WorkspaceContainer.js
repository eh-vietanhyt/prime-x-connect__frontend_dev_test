import React from 'react'
import propTypes from 'prop-types'

import Col from 'react-bootstrap/Col'

const WorkspaceContainer = ({
  children
}) => (
  <Col xs={12} md={10} className="Workspace">
    <div className="WorkspaceInner">
      {children}
    </div>
  </Col>
)

WorkspaceContainer.propTypes = {
  children: propTypes.array
}

export default WorkspaceContainer
