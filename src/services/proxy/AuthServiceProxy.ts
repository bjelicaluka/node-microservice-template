import { IAuthService } from "../../contracts/services/proxy/IAuthService";
import Axios from "axios";
import { RemoteServicesInfo } from "../../config";
import { injectable } from "inversify";

const { API_URL, TOKEN_VALIDATION_ROUTE } = RemoteServicesInfo.AuthService;

@injectable()
export class AuthServiceProxy implements IAuthService {
  
  validateToken(token: string, roles: string[]): Promise<any> {
    return Axios.post(`${API_URL}${TOKEN_VALIDATION_ROUTE}`, { roles }, {
      headers: {
        'Authorization': token
      }
    });
  }

}