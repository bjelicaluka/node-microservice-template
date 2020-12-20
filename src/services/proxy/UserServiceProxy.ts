import { IAuthService } from "../../contracts/Services/IAuthService";
import Axios from "axios";
import { RemoteServicesInfo } from "../../config";
import { IUserService } from "../../contracts/Services/IUserService";

const { API_URL, TOKEN_USER_GROUP_VALIDATION_ROUTE } = RemoteServicesInfo.UserService;

export class UserServiceProxy implements IUserService {

  validateTokenUserGroup(token: string, userGroupId: string): Promise<any> {
    return Axios.get(`${API_URL}${TOKEN_USER_GROUP_VALIDATION_ROUTE}${userGroupId}`, {
      headers: {
        'Authorization': token
      }
    });
  }

  public static getInstance(): IUserService {
    return new UserServiceProxy();
  }

}