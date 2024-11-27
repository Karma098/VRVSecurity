import { useAppDispatch, useAppSelector } from './redux';
import { addUser, updateUser, deleteUser } from '../store/slices/userSlice';
import { addRole, updateRole, deleteRole } from '../store/slices/roleSlice';

export const useStore = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const roles = useAppSelector((state) => state.roles.roles);
  const permissions = useAppSelector((state) => state.permissions.permissions);

  return {
    users,
    roles,
    permissions,
    addUser: (user: any) => dispatch(addUser(user)),
    updateUser: (id: string, user: any) => dispatch(updateUser({ id, user })),
    deleteUser: (id: string) => dispatch(deleteUser(id)),
    addRole: (role: any) => dispatch(addRole(role)),
    updateRole: (id: string, role: any) => dispatch(updateRole({ id, role })),
    deleteRole: (id: string) => dispatch(deleteRole(id)),
  };
};