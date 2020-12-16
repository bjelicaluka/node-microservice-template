import { getRepository } from "typeorm";
import { AlarmRecord } from "../entity/AlarmRecord";
import { ICrudService } from "../contracts/Services/ICrudService";
import { CrudService } from "./CrudService";
import { BaseEntity } from "../entity/BaseEntity";

export class AlarmRecordService extends CrudService {
    
    constructor() {
        super();
        this.repository = getRepository(AlarmRecord);
    }

    public static getInstance(): ICrudService<BaseEntity> {
        return new AlarmRecordService();
    }

}