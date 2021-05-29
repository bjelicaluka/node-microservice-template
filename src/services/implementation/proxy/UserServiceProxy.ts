import Axios from "axios";
import { RemoteServicesInfo } from "../../../config";
import { injectable } from "inversify";
import { IUserService } from "../../contracts/proxy/IUserService";

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