const getUserOrganisationFeaturesTxt = user =>
  (user.organisationFeatures || []).length > 0
    ? user.organisationFeatures.map(i => i.label).join(', ')
    : ''

export default getUserOrganisationFeaturesTxt
