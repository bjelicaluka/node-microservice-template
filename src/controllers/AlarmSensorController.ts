import { AlarmSensorService } from "../services/AlarmSensorService";
import { CrudController } from "./CrudController";

export class AlarmSensorController extends CrudController {

    constructor() {
        super(AlarmSensorService.getInstance());
    }

}