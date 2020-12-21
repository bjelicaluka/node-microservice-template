import { getRepository } from "typeorm";
import { CrudService } from "./CrudService";
import { Alarm } from "../entity/Alarm";
import { IAlarmService } from "../contracts/Services/IAlarmService";

export class AlarmService extends CrudService implements IAlarmService {
    
    constructor() {
        super();
        this.repository = getRepository(Alarm);
    }

}