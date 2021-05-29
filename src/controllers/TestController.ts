import { inject } from "inversify";
import { ITestService } from "../services/contracts/ITestService";
import { CrudController } from "./CrudController";

export class TestController extends CrudController {

    constructor(@inject("ITestService") service: ITestService) {
      super(service);
    }

}