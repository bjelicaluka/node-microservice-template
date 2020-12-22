import Axios from "axios";
import { RemoteServicesInfo } from "../../config";
import { injectable } from "inversify";
import { ISensorService, SensorInfo } from "../../contracts/Services/proxy/ISensorService";

const { API_URL, AUTHENTICATE_ROUTE } = RemoteServicesInfo.SensorService;

@injectable()
export class SensorServiceProxy implements ISensorService {

  async authenticateAndFetchSensorInfo(sensorId: string, apiToken: string): Promise<SensorInfo> {
    return (await Axios.post(`${API_URL}${AUTHENTICATE_ROUTE}`, { sensorId, apiToken })).data;
  }
  
}