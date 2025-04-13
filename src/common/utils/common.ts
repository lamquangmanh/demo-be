function userHasPermission(
  user: User,
  action: string,
  resource: string,
): boolean {
  for (const role of user.roles) {
    for (const permission of role.permissions) {
      if (permission.action === action && permission.resource === resource) {
        return true;
      }
    }
  }
  return false;
}
