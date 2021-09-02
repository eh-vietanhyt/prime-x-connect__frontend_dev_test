import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button'

import { actions } from '../../app/state_management/actions'
import { PER_PAGE } from '../../app/state_management/slice'

const Pagination = ({
  isUpdatingOrganisationUsersList,
  usersQuery: {
    pageBreakValue
  },
  organisationUsersList: {
    data: users,
    hasNextPage,
    hasPreviousPage
  },
  dispatch
}) => {
  const onGoToPrevPage = async () => {
    await dispatch(actions.getOrganisationUsersList({
      order: 'last',
      limit: PER_PAGE,
      pageBreakValue: users.length ? users[0].createdAt - 1 : pageBreakValue
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
    <div className="d-flex justify-content-center">
      <div
        className="btn-group"
        role="group"
      >
        <Button
          variant="primary"
          disabled={!hasPreviousPage || isUpdatingOrganisationUsersList}
          onClick={onGoToPrevPage}
        >
          Prev
        </Button>
        <Button
          variant="primary"
          disabled={!hasNextPage || isUpdatingOrganisationUsersList}
          onClick={onGoToNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  isUpdatingOrganisationUsersList: propTypes.bool,
  usersQuery: propTypes.object,
  organisationUsersList: propTypes.object,
  dispatch: propTypes.func
}

export default connect(state => ({
  ...state.app
}))(Pagination)
