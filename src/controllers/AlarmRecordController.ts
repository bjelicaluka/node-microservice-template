import { inject } from "inversify";
import { IAlarmRecordService } from "../contracts/services/IAlarmRecordService";
import { CrudController } from "./CrudController";

export class AlarmRecordController extends CrudController {

    constructor(@inject("IAlarmRecordService") service: IAlarmRecordService) {
        super(service);
    }

}