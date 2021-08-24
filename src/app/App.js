import React, { useEffect } from 'react'
import propsTypes from 'prop-types'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import {
  PageTopHeader,
  LeftSidebar,
  WorkspaceContainer,
  WorkspaceHeader,
  WorkspaceFooter
} from './partials'

import UsersManagement from './UsersManagement'

import { actions } from './state_management/actions'

const App = ({
  initialed,
  dispatch
}) => {
  useEffect(() => {
    dispatch(actions.init()).then(action => {
      if (action.meta.requestStatus === 'fulfilled') console.log('app initialed successfully')
    })
  }, [dispatch])

  if (initialed === 'pending') return <div>loading spinner screen here...</div>
  if (initialed === 'rejected') return <div>unexpected error screen here...</div>

  return (
    <div className="App">
      <PageTopHeader />
      <Container fluid={true} className="AppContent">
        <Row>
          <LeftSidebar />
          <WorkspaceContainer>
            <WorkspaceHeader />
            <UsersManagement />
            <WorkspaceFooter />
          </WorkspaceContainer>
        </Row>
      </Container>
    </div>
  )
}

App.propTypes = {
  initialed: propsTypes.string,
  dispatch: propsTypes.func
}

export default connect(state => ({
  ...state.app
}))(App)
