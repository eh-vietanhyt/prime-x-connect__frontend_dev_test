import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button'

const Pagination = ({
  hasPreviousPage,
  hasNextPage,
  isLoading,
  onGoToPrevPage,
  onGoToNextPage
}) => (
  <div className="d-flex justify-content-center">
    <div
      className="btn-group"
      role="group"
    >
      <Button
        variant="primary"
        disabled={!hasPreviousPage || isLoading}
        onClick={onGoToPrevPage}
      >
        Prev
      </Button>
      <Button
        variant="primary"
        disabled={!hasNextPage || isLoading}
        onClick={onGoToNextPage}
      >
        Next
      </Button>
    </div>
  </div>
)

Pagination.propTypes = {
  hasPreviousPage: propTypes.bool.isRequired,
  hasNextPage: propTypes.bool.isRequired,
  isLoading: propTypes.bool,
  onGoToPrevPage: propTypes.func.isRequired,
  onGoToNextPage: propTypes.func.isRequired
}

export default connect(state => ({
  ...state.app
}))(Pagination)
