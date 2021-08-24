import * as Yup from 'yup'

const organisationFormValidationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required'), // should be configured in config
})

export default organisationFormValidationSchema
