import Axios from "axios";
import {NextFunction, Request, Response} from "express";
import { RemoteServicesInfo } from "../config";

const {API, PORT, ROUTE} = RemoteServicesInfo.AuthService;

export function AuthServiceMiddleware(roles: string[]): Function {
    return (request: Request, response: Response, next: NextFunction) => {
        Axios.post(`${API}:${PORT}${ROUTE}`, {roles}, {
              headers: {
                  'Authorization':  request && request.headers && request.headers.authorization
              }
          }).then(res => {
            next();
          }).catch(err =>{ 
            response.status(401);
            response.send();
          });
        
    }
}