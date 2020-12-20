import { IAuthService } from "../../contracts/Services/IAuthService";
import Axios from "axios";
import { RemoteServicesInfo } from "../../config";

const { API_URL, TOKEN_VALIDATION_ROUTE } = RemoteServicesInfo.AuthService;

export class AuthServiceProxy implements IAuthService {
  
  validateToken(token: string, roles: string[]): Promise<any> {
    return Axios.post(`${API_URL}${TOKEN_VALIDATION_ROUTE}`, { roles }, {
      headers: {
        'Authorization': token
      }
    });
  }

  public static getInstance(): IAuthService {
    return new AuthServiceProxy();
  }

}