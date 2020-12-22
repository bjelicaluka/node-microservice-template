import { getRepository } from "typeorm";
import { CrudService } from "./CrudService";
import { Alarm } from "../entity/Alarm";
import { IAlarmService } from "../contracts/services/IAlarmService";

export class AlarmService extends CrudService<Alarm> implements IAlarmService {
    
    constructor() {
        super();
        this.repository = getRepository(Alarm);
    }

}