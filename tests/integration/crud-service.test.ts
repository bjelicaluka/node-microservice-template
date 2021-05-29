import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const {expect} = chai;

import { Test } from '../../src/model/Test';
import { InvalidEntityError } from '../../src/error/errors/InvalidEntityError';
import { EntityAlreadyExistsError } from '../../src/error/errors/EntityAlreadyExistsError';
import { EntityNotFoundError } from '../../src/error/errors/EntityNotFoundError';
import { AppContainer } from './TestAppContainer';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { TEST_ORM_CONFIG } from './config';
import { TestEnum } from '../../src/model/enum/TestEnum';
import { ICrudService } from '../../src/services/contracts/ICrudService';

let crudService: ICrudService<Test>;

const entity: Test = {
  ...new Test(),
  name: "entity",
  userGroupId: "asdf",
  enum: TestEnum.First,
  numValue: 22
};

describe('CrudService', () => {
  

  before(async () => {
    try {
      await createConnection(TEST_ORM_CONFIG);
      crudService = AppContainer.get("ICrudService");
    } catch(err) {
      console.log(`Can't connect to the test database because of the following reason. \n${err}`);
    }
  });

  after(() => {
    getConnection().close();
  });

  afterEach(() => {
    getRepository(Test).delete({});
  });

  describe('read', () => {
    it('returns the list of entities', async () => {
      await crudService.add(entity);

      return expect(crudService.read())
        .to.eventually.satisfy((entities: Test[]) => entities.reduce((acc, curr) => acc && curr.isActive, true))
        .and.to.not.be.empty;
    });
  });

  describe('readOne', () => {
    it('for existing entity - returns entity', async () => {
      const existingEntity = await crudService.add(entity);

      return expect(crudService.readOne(existingEntity.id))
        .to.eventually.have.property('id', existingEntity.id);
    });

    it('for not existing entity - returns null', () => {
      return expect(crudService.readOne(0))
        .to.eventually.not.be.ok;
    });

    it('for null id - returns null', () => {
      return expect(crudService.readOne(null))
        .to.eventually.not.be.ok;
    });
  });

  describe('tryToReadOne', () => {
    it('for existing entity - returns entity', async () => {
      const existingEntity = await crudService.add(entity);

      return expect(crudService.tryToReadOne(existingEntity.id))
        .to.eventually.have.property('id', existingEntity.id);
    });

    it('for not existing entity - throws exception', () => {
      return expect(crudService.tryToReadOne(0))
        .to.eventually.be.rejected
        .and.to.have.property('name', EntityNotFoundError.name);
    });

    it('for null id - throws exception', () => {
      return expect(crudService.tryToReadOne(0))
        .to.eventually.be.rejected
        .and.to.have.property('name', EntityNotFoundError.name);
    });
  });

  describe('add', () => {
    it('for entity not existing - saves entity', async () => {
      const createdTest = await crudService.add(entity);

      expect(createdTest.isActive).to.be.true;
      expect(createdTest.name).to.equal("entity");
    });
    
    it('for entity existing - throws exception', async () => {
      const existingEntity = await crudService.add(entity);

      return expect(crudService.add(existingEntity))
        .to.eventually.be.rejected
        .and.to.have.property('name', EntityAlreadyExistsError.name);
    });

    it('for entity null - throws exception', () => {
      return expect(crudService.add(null))
        .to.eventually.be.rejected
        .and.to.have.property('name', InvalidEntityError.name);
    });

  });

  describe('update', () => {
    it('for entity existing - updates entity', async () => {
      const existingEntity = await crudService.add(entity);
      existingEntity.name = "updated";

      const createdTest = await crudService.update(existingEntity);

      expect(createdTest.isActive).to.be.true;
      expect(createdTest.name).to.equal("updated");
    });

    it('for entity not existing - throws exception', () => {
      const entity = new Test();
      entity.id = 1;

      return expect(crudService.update(entity))
        .to.eventually.be.rejected
        .and.to.have.property('name', EntityNotFoundError.name);
    });
  });

  describe('delete', () => {
    it('for entity existing - deletes entity', async () => {
      const existingEntity = await crudService.add(entity);

      const deletedEntity = await crudService.delete(existingEntity.id);

      expect(deletedEntity.id).to.eq(existingEntity.id);
      expect(deletedEntity.isActive).to.be.false;
    });

    it('for entity not existing - throws exception', () => {
      return expect(crudService.delete(1))
        .to.eventually.be.rejected
        .and.to.have.property('name', EntityNotFoundError.name);
    });

    it('for entity id null - throws exception', () => {
      return expect(crudService.delete(null))
        .to.eventually.be.rejected
        .and.to.have.property('name', EntityNotFoundError.name);
    });
  });

});