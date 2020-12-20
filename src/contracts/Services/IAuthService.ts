export interface IAuthService {

  validateToken(token: string, roles: string[]): Promise<any>;

}