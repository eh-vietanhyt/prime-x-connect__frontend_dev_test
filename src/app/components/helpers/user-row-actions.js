import { actions } from '../../state_management/actions'
import { initialState } from '../../state_management/slice'

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
        dispatch(actions.getOrganisationUsersList(initialState.usersQuery))
      })
    }
  }
])

export default userRowActions
