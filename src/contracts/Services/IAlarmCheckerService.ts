import { SensorInfo } from "../../entity/remote/SensorInfo";

export interface IAlarmCheckerService {
  checkForAlarms(sensorInfo: SensorInfo, data: any): Promise<void>;
}