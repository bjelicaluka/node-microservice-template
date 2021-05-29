export interface IUserService {

  validateTokenUserGroup(token: string, userGroupId: string, roles: string[]): Promise<any>;

}