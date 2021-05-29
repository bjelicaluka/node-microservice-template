import { NextFunction, Request, Response } from "express";
import { BaseEntity } from "../model/BaseEntity";
import { injectable } from "inversify";
import { ICrudService } from "../services/contracts/ICrudService";
import { ICrudController } from "./contracts/ICrudController";

@injectable()
export class CrudController implements ICrudController {

    private service: ICrudService<BaseEntity>;

    constructor(service: ICrudService<BaseEntity>) {
        this.service = service;
    }
    
    async get(request: Request, response: Response, next: NextFunction) {
        return this.service.read();
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        return this.service.tryToReadOne(parseInt(request.params.id));
    }

    async add(request: Request, response: Response, next: NextFunction) {
        return this.service.add(request.body);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.service.update(request.body);
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        return this.service.delete(parseInt(request.params.id));
    }

}