import Axios from "axios";
import { RemoteServicesInfo } from "../../config";
import { inject, injectable } from "inversify";
import { ISensorService, SensorInfo } from "../../contracts/services/proxy/ISensorService";
import { IRemoteCacheService } from "../../contracts/services/cache/IRemoteCacheService";

const { API_URL, AUTHENTICATE_ROUTE } = RemoteServicesInfo.SensorService;

@injectable()
export class SensorServiceProxy implements ISensorService {

  private remoteCacheService: IRemoteCacheService;

  constructor(
    @inject("IRemoteCacheService") remoteCacheService: IRemoteCacheService
  ) {
    this.remoteCacheService = remoteCacheService;
  }

  async authenticateAndFetchSensorInfo(sensorId: string, apiToken: string): Promise<SensorInfo> {
    if(await this.remoteCacheService.keyExists(sensorId + apiToken))
      return await this.remoteCacheService.getValue(sensorId + apiToken);
    else {
      const sensorInfo: SensorInfo = (await Axios.post(`${API_URL}${AUTHENTICATE_ROUTE}`, { sensorId, apiToken })).data;
      this.remoteCacheService.cacheValue(sensorId + apiToken, sensorInfo);
      return sensorInfo
    }
  }
  
}