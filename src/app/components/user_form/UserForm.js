import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import MultiSelect from '../../../share/components/MultiSelect'

import { actions } from '../../state_management/actions'

import formInitialValues, {
  rolesList,
  organisationFeaturesList,
  countriesList
} from './helpers/form-initial-values'

import userFormValidationSchema from './helpers/form-validation-schema'

const UserModal = ({
  selectedUser,
  selectedOrganisation,
  isShowingUserFormModal,
  isCreatingOrUpdatingUser,
  dispatch
}) => {
  const isUpdate = !!selectedUser.id

  const handleCloseModal = () => {
    dispatch(actions.toggleUserFormModal(false))
    dispatch(actions.setSelectedUser({}))
  }

  const onSubmit = async (values, formikActions) => {
    const action = await dispatch(actions.createOrUpdateOrganisationUser(values))

    if (action.meta.requestStatus === 'fulfilled') {
      await dispatch(actions.init())
      handleCloseModal()
    } else {
      formikActions.setErrors({
        name: 'this should be handled'
      })
    }
  }

  return (
    <Modal show={isShowingUserFormModal} onHide={handleCloseModal}>
      <Formik
        initialValues={formInitialValues({
          user: selectedUser,
          organisation: selectedOrganisation
        })}
        validationSchema={userFormValidationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Header>
              <Modal.Title>{`${isUpdate ? 'Update' : 'Create'} User`}</Modal.Title>
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
                  isInvalid={!!errors.name && touched.name}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={values.email}
                  isInvalid={!!errors.email && touched.email}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="userRole">
                <Form.Label>Roles</Form.Label>
                <Form.Control
                  className="form-control"
                  name="roles"
                  placeholder="Roles"
                  required
                  value={values.roles}
                  isInvalid={!!errors.roles && touched.roles}
                  onChange={handleChange}
                  as="select"
                >
                  <option value="">Select roles</option>
                  {rolesList.map((role, indexRole) => (
                    <option key={indexRole}>{role}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.roles}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="userOrganisation">
                <Form.Label>Organisation</Form.Label>
                <Form.Control
                  type="text"
                  name="organisation"
                  placeholder="Organisation"
                  value={values.organisation}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="userOrganisationFeatures">
                <Form.Label>Organisation Features</Form.Label>
                <MultiSelect
                  id="userOrganisationFeatures"
                  value={values.organisationFeatures}
                  options={organisationFeaturesList}
                  onChange={val => setFieldValue('organisationFeatures', val)}
                />
              </Form.Group>
              <Form.Group controlId="userCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  className="form-control"
                  name="country"
                  placeholder="Country"
                  required
                  value={values.country}
                  isInvalid={!!errors.country && touched.country}
                  onChange={handleChange}
                  as="select"
                >
                  <option value="">Select country</option>
                  {countriesList.map((country, indexCountry) => (
                    <option key={indexCountry}>{country}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.country}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={isCreatingOrUpdatingUser}>
                {
                  isCreatingOrUpdatingUser
                    ? 'Submitting...'
                    : isUpdate
                      ? 'Update'
                      : 'Create'
                }
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

UserModal.propTypes = {
  selectedUser: propTypes.object,
  selectedOrganisation: propTypes.object,
  isShowingUserFormModal: propTypes.bool,
  isCreatingOrUpdatingUser: propTypes.bool,
  dispatch: propTypes.func
}

export default connect(state => ({
  ...state.app
}))(UserModal)
