import { NextFunction, Request, Response } from "express";
import { ICrudController } from "../contracts/ICrudController";
import { BaseEntity } from "../entity/BaseEntity";
import { ICrudService } from "../contracts/Services/ICrudService";

export class CrudController implements ICrudController {

    private service: ICrudService<BaseEntity>;

    constructor(service: ICrudService<BaseEntity>) {
        this.service = service;
    }
    
    async get(request: Request, response: Response, next: NextFunction) {
        return this.service.get();
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        return this.service.getById(parseInt(request.params.id));
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