import { CrudService } from "./CrudService";
import { inject } from "inversify";
import { Repository } from "typeorm";
import { Test } from "../../model/Test";
import { ITestService } from "../contracts/ITestService";

export class TestService extends CrudService<Test> implements ITestService {

  constructor(@inject("TestRepository") testRepository: Repository<Test>) {
    super(testRepository);
  }

}