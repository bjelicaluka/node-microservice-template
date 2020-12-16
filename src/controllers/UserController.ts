import {NextFunction, Request, Response} from "express";
import { IController } from "../contracts/IController";
import { UserService } from "../services/UserService";
import { IUserService } from "../contracts/Services/IUserService";

export class UserController implements IController {

    private userService: IUserService = UserService.getInstance();
    
    async get(request: Request, response: Response, next: NextFunction) {
        return this.userService.get();
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        return this.userService.getById(request.params.id);
    }

    async add(request: Request, response: Response, next: NextFunction) {
        return this.userService.add(request.body);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.userService.update(request.body);
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        return this.userService.delete(request.params.id);
    }

}