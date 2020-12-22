import { getRepository } from "typeorm";
import { IAlarmRecordService } from "../contracts/Services/IAlarmRecordService";
import { AlarmRecord } from "../entity/AlarmRecord";
import { CrudService } from "./CrudService";

export class AlarmRecordService extends CrudService<AlarmRecord> implements IAlarmRecordService {
    
    constructor() {
        super();
        this.repository = getRepository(AlarmRecord);
    }

}