import { inject } from "inversify";
import { IAlarmSensorService } from "../contracts/services/IAlarmSensorService";
import { CrudController } from "./CrudController";

export class AlarmSensorController extends CrudController {

    constructor(@inject("IAlarmSensorService") service: IAlarmSensorService) {
        super(service);
    }

}