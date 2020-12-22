import { AlarmSensor } from "../../entity/AlarmSensor";
import { BaseEntity } from "../../entity/BaseEntity";
import { ICrudService } from "./ICrudService";

export interface IAlarmSensorService extends ICrudService<BaseEntity> {
  getBySensorId(sensorId: string): Promise<AlarmSensor[]>;
};