import { getRepository } from "typeorm";
import { AlarmRecord } from "../entity/AlarmRecord";
import { CrudService } from "./CrudService";

export class AlarmRecordService extends CrudService {
    
    constructor() {
        super();
        this.repository = getRepository(AlarmRecord);
    }

}