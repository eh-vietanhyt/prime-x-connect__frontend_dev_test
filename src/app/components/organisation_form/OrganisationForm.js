import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { actions } from '../../state_management/actions'

import {
  formInitialValues,
  formValidationSchema
} from './helpers'

const OrganisationForm = ({
  isCreatingOrganisation,
  isShowingOrganisationFormModal,
  dispatch
}) => {
  const handleCloseModal = () => dispatch(actions.toggleOrganisationFormModal(false))

  const onSubmit = async (values, formikActions) => {
    const action = await dispatch(actions.createOrganisation(values))

    if (action.meta.requestStatus === 'fulfilled') {
      await dispatch(actions.getAllOrganisations())
      handleCloseModal()
    } else {
      formikActions.setErrors({
        name: 'this should be handled'
      })
    }
  }

  return (
    <Modal show={isShowingOrganisationFormModal} onHide={handleCloseModal}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={formValidationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Header>
              <Modal.Title>Add a new Organisation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  value={values.name}
                  isInvalid={!!errors.name}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button type="submit" variant="primary" disabled={isCreatingOrganisation}>
                {isCreatingOrganisation ? 'Submitting...' : 'Create'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

OrganisationForm.propTypes = {
  isCreatingOrganisation: PropTypes.bool,
  isShowingOrganisationFormModal: PropTypes.bool,
  dispatch: PropTypes.func
}

export default connect(state => ({
  ...state.app
}))(OrganisationForm)
