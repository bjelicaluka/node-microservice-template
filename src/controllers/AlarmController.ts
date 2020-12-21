import { inject } from "inversify";
import { IAlarmService } from "../contracts/Services/IAlarmService";
import { CrudController } from "./CrudController";

export class AlarmController extends CrudController {

    constructor(@inject("IAlarmService") service: IAlarmService) {
        super(service);
    }

}