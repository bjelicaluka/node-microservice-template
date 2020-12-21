import { getRepository } from "typeorm";
import { CrudService } from "./CrudService";
import { AlarmSensor } from "../entity/AlarmSensor";

export class AlarmSensorService extends CrudService {
    
    constructor() {
        super();
        this.repository = getRepository(AlarmSensor);
    }

}