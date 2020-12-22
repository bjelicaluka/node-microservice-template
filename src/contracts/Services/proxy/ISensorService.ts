interface RecordType {
  [key: string]: string;
}

export interface SensorInfo {
  locationId: string;
  userGroupId: string;
  name: string,
  recordType: RecordType 
  id: string;
}

export interface ISensorService {

  authenticateAndFetchSensorInfo(sensorId: string, apiToken: string): Promise<SensorInfo>;

}