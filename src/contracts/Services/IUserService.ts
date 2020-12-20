export interface IUserService {

  validateTokenUserGroup(token: string, userGroupId: string): Promise<any>;

}