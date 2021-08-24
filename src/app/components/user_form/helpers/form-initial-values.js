export const rolesList = ['Owner']

export const countriesList = ['Vietnam', 'Australia']

export const organisationFeaturesList = [
  { label: 'Trade Vault', value: 'Trade Vault' },
  { label: 'Inventory', value: 'Inventory' },
  { label: 'Analytics', value: 'Analytics' }
]

const formInitialValues = ({
  user,
  organisation
}) => ({
  id: user.id || '',
  name: user.name || '',
  email: user.email || '',
  roles: user.roles || '',
  organisation: organisation.name,
  organisationFeatures: user.organisationFeatures || [],
  country: user.country || '',
  createdAt: user.createdAt || ''
})

export default formInitialValues
