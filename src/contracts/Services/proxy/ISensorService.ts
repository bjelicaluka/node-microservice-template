import { Sensor } from "../../../entity/remote/Sensor";

export interface SensorInfo {
  userGroupId: string;
  sensor: Sensor;
}

export interface ISensorService {

  authenticateAndFetchSensorInfo(sensorId: string, apiToken: string): Promise<SensorInfo>;

}