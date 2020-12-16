import { AlarmService } from "../services/AlarmService";
import { CrudController } from "./CrudController";

export class AlarmController extends CrudController {

    constructor() {
        super(AlarmService.getInstance());
    }

}