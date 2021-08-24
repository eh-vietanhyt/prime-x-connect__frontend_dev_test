const getUserOrganisationFeaturesTxt = user =>
  (user.organisationFeatures || [])
    ? user.organisationFeatures.map(i => i.label).join(', ')
    : ''

export default getUserOrganisationFeaturesTxt
