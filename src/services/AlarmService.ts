import { getRepository } from "typeorm";
import { ICrudService } from "../contracts/Services/ICrudService";
import { CrudService } from "./CrudService";
import { BaseEntity } from "../entity/BaseEntity";
import { Alarm } from "../entity/Alarm";

export class AlarmService extends CrudService {
    
    constructor() {
        super();
        this.repository = getRepository(Alarm);
    }

    public static getInstance(): ICrudService<BaseEntity> {
        return new AlarmService();
    }

}