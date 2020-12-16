import { NextFunction, Request, Response } from "express";
import { IController } from "../contracts/IController";
import { AlarmRecordService } from "../services/AlarmRecordService";
import { BaseEntity } from "../entity/BaseEntity";
import { ICrudService } from "../contracts/Services/ICrudService";

export class AlarmRecordController implements IController {

    private alarmRecordService: ICrudService<BaseEntity> = AlarmRecordService.getInstance();
    
    async get(request: Request, response: Response, next: NextFunction) {
        return this.alarmRecordService.get();
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        return this.alarmRecordService.getById(request.params.id);
    }

    async add(request: Request, response: Response, next: NextFunction) {
        return this.alarmRecordService.add(request.body);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.alarmRecordService.update(request.body);
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        return this.alarmRecordService.delete(request.params.id);
    }

}