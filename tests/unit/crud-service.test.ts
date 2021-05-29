import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Sinon, { SinonSandbox } from 'sinon';

chai.use(chaiAsPromised);
const {expect} = chai;

import { Test } from '../../src/model/Test';
import { Repository } from 'typeorm';
import { InvalidEntityError } from '../../src/error/errors/InvalidEntityError';
import { EntityAlreadyExistsError } from '../../src/error/errors/EntityAlreadyExistsError';
import { EntityNotFoundError } from '../../src/error/errors/EntityNotFoundError';
import { ICrudService } from '../../src/services/contracts/ICrudService';
import { CrudService } from '../../src/services/implementation/CrudService';

const repository: Repository<Test> = new Repository();
const crudService: ICrudService<Test> = new CrudService(repository);

describe('CrudService', () => {
  
  let sinon: SinonSandbox;

  beforeEach(() => {
    sinon = Sinon.createSandbox();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('read', () => {
    it('returns the list of entities', () => {
      const entities = [{...new Test(), isActive: true}, {...new Test(), isActive: true}];

      sinon.stub(repository, "find").returns(new Promise(resolve => resolve(entities)));

      return expect(crudService.read())
        .to.eventually.be.equal(entities)
        .and.lengthOf(entities.length);
    });
  });

  describe('readOne', () => {
    it('for existing entity - returns entity', () => {
      const entity = new Test();
      entity.id = 1;

      sinon.stub(repository, "findOne").returns(new Promise(resolve => resolve(entity)));

      return expect(crudService.readOne(entity.id))
        .to.eventually.be.equal(entity);
    });

    it('for not existing entity - returns null', () => {
      sinon.stub(repository, "findOne").returns(new Promise(resolve => resolve(null)));

      return expect(crudService.readOne(0))
        .to.eventually.not.be.ok;
    });

    it('for null id - returns null', () => {
      sinon.stub(repository, "findOne").returns(new Promise(resolve => resolve(null)));

      return expect(crudService.readOne(null))
        .to.eventually.not.be.ok;
    });
  });

  describe('tryToReadOne', () => {
    it('for existing entity - returns entity', () => {
      const entity = new Test();
      entity.id = 1;

      sinon.stub(repository, "findOne").returns(new Promise(resolve => resolve(entity)));

      return expect(crudService.tryToReadOne(entity.id))
        .to.eventually.be.equal(entity);
    });

    it('for not existing entity - throws exception', () => {
      sinon.stub(repository, "findOne").returns(new Promise(resolve => resolve(null)));

      return expect(crudService.tryToReadOne(0))
        .to.eventually.be.rejected
        .and.to.have.property('name', EntityNotFoundError.name);
    });

    it('for null id - throws exception', () => {
      sinon.stub(repository, "findOne").returns(new Promise(resolve => resolve(null)));

      return expect(crudService.tryToReadOne(0))
        .to.eventually.be.rejected
        .and.to.have.property('name', EntityNotFoundError.name);
    });
  });

  describe('add', () => {
    it('for entity not existing - saves entity', async () => {
      const entity = new Test();
      entity.name = "entity";

      sinon.stub(repository, "findOne").returns(new Promise(resolve => resolve(null)));
      sinon.stub(repository, "save").returns(new Promise(resolve => resolve({...entity, id: 1})));

      const createdTest = await crudService.add(entity);

      expect(createdTest.id).to.eq(1);
      expect(createdTest.name).to.eq("entity");
    });
    
    it('for entity existing - throws exception', () => {
      const entity = new Test();
      entity.id = 1;

      sinon.stub(repository, "findOne").returns(new Promise(resolve => resolve(entity)));

      return expect(crudService.add(entity))
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
      const entity = new Test();
      entity.id = 1;
      entity.name = "entity";

      sinon.stub(repository, "save").returns(new Promise(resolve => resolve({...entity, name: "updated"})));
      sinon.stub(repository, "findOne").returns(new Promise(resolve => resolve(entity)));

      const createdTest = await crudService.update(entity);

      expect(createdTest.id).to.eq(1);
      expect(createdTest.name).to.eq("updated");
    });

    it('for entity not existing - throws exception', () => {
      const entity = new Test();
      entity.id = 1;

      sinon.stub(repository, "findOne").returns(new Promise(resolve => resolve(null)));

      return expect(crudService.update(entity))
        .to.eventually.be.rejected
        .and.to.have.property('name', EntityNotFoundError.name);
    });
  });

  describe('delete', () => {
    it('for entity existing - deletes entity', async () => {
      const entity = new Test();
      entity.id = 1;

      sinon.stub(repository, "findOne").returns(new Promise(resolve => resolve(entity)));
      sinon.stub(repository, "save").returnsArg(0);

      const deletedTest = await crudService.delete(entity.id);

      expect(deletedTest.id).to.eq(1);
      expect(deletedTest.isActive).to.be.false;
    });

    it('for entity not existing - throws exception', () => {
      sinon.stub(repository, "findOne").returns(new Promise(resolve => resolve(null)));

      return expect(crudService.delete(1))
        .to.eventually.be.rejected
        .and.to.have.property('name', EntityNotFoundError.name);
    });

    it('for entity id null - throws exception', () => {
      sinon.stub(repository, "findOne").returns(new Promise(resolve => resolve(null)));

      return expect(crudService.delete(null))
        .to.eventually.be.rejected
        .and.to.have.property('name', EntityNotFoundError.name);
    });
  });

});