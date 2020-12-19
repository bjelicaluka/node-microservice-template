import { getRepository } from "typeorm";
import { ICrudService } from "../contracts/Services/ICrudService";
import { CrudService } from "./CrudService";
import { BaseEntity } from "../entity/BaseEntity";
import { AlarmSensor } from "../entity/AlarmSensor";

export class AlarmSensorService extends CrudService {
    
    constructor() {
        super(getRepository(AlarmSensor));
    }

    public static getInstance(): ICrudService<BaseEntity> {
        return new AlarmSensorService();
    }

}