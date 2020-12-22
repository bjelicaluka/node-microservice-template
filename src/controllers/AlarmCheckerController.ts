import { application, NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IController } from "../contracts/IController";
import { IAlarmCheckerService } from "../contracts/Services/IAlarmCheckerService";
import { ISensorService } from "../contracts/Services/proxy/ISensorService";

@injectable()
export class AlarmCheckerController implements IController {

  private alarmCheckerService: IAlarmCheckerService;
  private sensorService: ISensorService;

  constructor(
    @inject("IAlarmCheckerService") alarmCheckerService: IAlarmCheckerService,
    @inject("ISensorService") sensorService: ISensorService,
  ) {
    this.alarmCheckerService = alarmCheckerService;
    this.sensorService = sensorService;
  }

  async checkForAlarms(request: Request, response: Response, next: NextFunction) {
    const { sensorId, apiToken, data } = request.body;
    const sensorInfo = await this.sensorService.authenticateAndFetchSensorInfo(sensorId, apiToken);
    await this.alarmCheckerService.checkForAlarms(sensorInfo, data);
    response.status(200);
    response.send();
  }

}