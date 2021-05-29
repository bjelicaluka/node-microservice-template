import 'reflect-metadata'
import { Container } from 'inversify';
import { Test } from '../../src/model/Test';
import { getRepository } from 'typeorm';
import { ICrudService } from '../../src/services/contracts/ICrudService';
import { CrudService } from '../../src/services/implementation/CrudService';

const AppContainer = new Container();

// Services
AppContainer.bind<ICrudService<Test>>("ICrudService").toDynamicValue(() => new CrudService(getRepository(Test))).inRequestScope();


export { AppContainer };
