import { SensorInfo } from "./proxy/ISensorService";

export interface IAlarmCheckerService {
  checkForAlarms(sensorInfo: SensorInfo, data: any): Promise<void>;
}