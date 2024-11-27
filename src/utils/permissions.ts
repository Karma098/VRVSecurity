export const PERMISSIONS = {
  USERS: {
    READ: 'users.read',
    WRITE: 'users.write',
    DELETE: 'users.delete',
  },
  ROLES: {
    READ: 'roles.read',
    WRITE: 'roles.write',
    DELETE: 'roles.delete',
  },
} as const;

export const hasPermission = (userPermissions: string[], permission: string): boolean => {
  return userPermissions.includes(permission);
};