import { actions } from '../../state_management/actions'

const userRowActions = ({
  user,
  dispatch
}) => ([
  {
    variant: 'primary',
    label: 'Edit',
    onClick: () => {
      dispatch(actions.setSelectedUser(user))
      dispatch(actions.toggleUserFormModal(true))
    }
  },
  {
    variant: 'danger',
    label: 'Delete',
    onClick: () => {
      dispatch(actions.deleteOrganisationUser(user.id)).then(() => {
        dispatch(actions.init())
      })
    }
  }
])

export default userRowActions
