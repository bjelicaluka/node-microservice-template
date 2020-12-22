import { getRepository } from "typeorm";
import { CrudService } from "./CrudService";
import { AlarmSensor } from "../entity/AlarmSensor";
import { IAlarmSensorService } from "../contracts/services/IAlarmSensorService";

export class AlarmSensorService extends CrudService<AlarmSensor> implements IAlarmSensorService {
    
    constructor() {
        super();
        this.repository = getRepository(AlarmSensor);
    }

    getBySensorId(sensorId: string): Promise<AlarmSensor[]> {
        return this.repository.find({ loadEagerRelations: true, where: { sensorId: sensorId } });
    }

}