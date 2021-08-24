import * as Yup from 'yup'

const userFormValidationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required'), // should be configured in config
  email: Yup.string().email('Must be a valid email').required('This field is required'),
  roles: Yup.string().required('This field is required'),
  organisation: Yup.string().required('This field is required'),
  country: Yup.string().required('This field is required'),
  organisationFeatures: Yup.array().of(
    Yup.object().shape({
      label: Yup.string(),
      value: Yup.string()
    })
  ).length(1)
})

export default userFormValidationSchema
