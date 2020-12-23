import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IController } from "../contracts/controllers/IController";
import { IAlarmCheckerService } from "../contracts/services/IAlarmCheckerService";
import { SensorInfo } from "../entity/remote/SensorInfo";

@injectable()
export class AlarmCheckerController implements IController {

  private alarmCheckerService: IAlarmCheckerService;

  constructor(
    @inject("IAlarmCheckerService") alarmCheckerService: IAlarmCheckerService,
  ) {
    this.alarmCheckerService = alarmCheckerService;
  }

  async checkForAlarms(request: Request, response: Response, next: NextFunction) {
    const { userGroupId, sensor, data } = request.body;
    const sensorInfo: SensorInfo = { userGroupId, sensor };
    return await this.alarmCheckerService.checkForAlarms(sensorInfo, data);
  }

}