import { AlarmRecordService } from "../services/AlarmRecordService";
import { CrudController } from "./CrudController";

export class AlarmRecordController extends CrudController {

    constructor() {
        super(AlarmRecordService.getInstance());
    }

}