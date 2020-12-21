import { IAuthService } from "../../contracts/Services/IAuthService";
import Axios from "axios";
import { RemoteServicesInfo } from "../../config";
import { IUserService } from "../../contracts/Services/IUserService";
import { injectable } from "inversify";

const { API_URL, TOKEN_USER_GROUP_VALIDATION_ROUTE } = RemoteServicesInfo.UserService;

@injectable()
export class UserServiceProxy implements IUserService {

  validateTokenUserGroup(token: string, userGroupId: string, roles: string[]): Promise<any> {
    return Axios.post(`${API_URL}${TOKEN_USER_GROUP_VALIDATION_ROUTE}`, 
    {
      roles: roles,
      groupId: userGroupId,
    },
    {
      headers: {
        'Authorization': token
      }
    });
  }

}