import { injectable } from "inversify";
import { DeepPartial, getRepository, Repository } from "typeorm";
import { ICrudService } from "../contracts/services/ICrudService";
import { BaseEntity } from "../entity/BaseEntity";
import { EntityAlreadyExistsError } from "../error/errors/EntityAlreadyExistsError";
import { EntityNotFoundError } from "../error/errors/EntityNotFoundError";

@injectable()
export class CrudService<T extends BaseEntity> implements ICrudService<T> {
    
    protected repository: Repository<T>;

    async get(): Promise<T[]> {
        return this.repository.find({ loadEagerRelations: true });
    }

    async getById(id: number): Promise<T> {
        const entityWithProvidedId = await this.repository.findOne(id);
        if(entityWithProvidedId)
            return entityWithProvidedId as T;
        throw new EntityNotFoundError("Entity with provided id does not exist.");
    }

    async add(entity: T): Promise<T> {
        const entityWithProvidedId = await this.repository.findOne(entity.id);
        if(!entity.id || !entityWithProvidedId)
            return this.repository.save(entity as BaseEntity as DeepPartial<T>);
        throw new EntityAlreadyExistsError("Entity with provided id already exists.");
    }

    async update(entity: T): Promise<T> {
        const entityWithProvidedId = await this.repository.findOne(entity.id);
        if(entityWithProvidedId)
            return this.repository.save(entity as BaseEntity as DeepPartial<T>);
        throw new EntityNotFoundError("Entity with provided id does not exist.");
    }

    async delete(id: number): Promise<T> {
        const entityWithProvidedId = await this.repository.findOne(id);
        if(entityWithProvidedId)
            return this.repository.remove(entityWithProvidedId);
        throw new EntityNotFoundError("Entity with provided id does not exist.");
    }

}