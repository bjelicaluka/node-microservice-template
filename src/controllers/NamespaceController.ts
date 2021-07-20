import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { SocketUserGroupSpecificMiddleware } from "../middleware/SecurityMiddleware";
import { INamespaceProvider } from "../services/contracts/events/INamespaceProvider";
import { IController } from "./contracts/IController";

@injectable()
export class NamespaceController implements IController {

  constructor(
    @inject("INamespaceProvider") private namespaceCreator: INamespaceProvider,
  ) {}

  async createNamespace(request: Request, response: Response, next: NextFunction): Promise<any> {
    const userGroupId = request.params.userGroupId;
    const { namespace } = request.body;

    this.namespaceCreator.createNamespaceIfNotExists(namespace)
      .use(SocketUserGroupSpecificMiddleware(userGroupId, ['CloudAdmin', 'Admin']));
    
    response.sendStatus(200);
  }

}