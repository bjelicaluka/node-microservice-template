import { injectable } from "inversify";
import { DeepPartial, Repository } from "typeorm";
import { EntityAlreadyExistsError } from "../../error/errors/EntityAlreadyExistsError";
import { EntityNotFoundError } from "../../error/errors/EntityNotFoundError";
import { InvalidEntityError } from "../../error/errors/InvalidEntityError";
import { BaseEntity } from "../../model/BaseEntity";
import { ICrudService } from "../contracts/ICrudService";

@injectable()
export class CrudService<T extends BaseEntity> implements ICrudService<T> {
    
    constructor(protected repository: Repository<T>) { }

    async read(): Promise<T[]> {
        return this.repository.find({ loadEagerRelations: true, where: { isActive: true } });
    }

    async readOne(id: number): Promise<T> {
        return this.repository.findOne({ where: { id, isActive: true } });
    }

    async tryToReadOne(id: number): Promise<T> {
        const entityWithProvidedId = await this.repository.findOne({ where: { id, isActive: true } });
        if(entityWithProvidedId)
            return entityWithProvidedId as T;
        throw new EntityNotFoundError("Entity with provided id does not exist.");
    }

    async add(entity: T): Promise<T> {
        if(!entity) throw new InvalidEntityError("Entity is invalid.");
        const entityWithProvidedId = await this.readOne(entity.id);
        if(!entityWithProvidedId)
            return this.repository.save(entity as BaseEntity as DeepPartial<T>);
        throw new EntityAlreadyExistsError("Entity with provided id already exists.");
    }

    async update(entity: T): Promise<T> {
        if(!entity || !entity.id) throw new InvalidEntityError("Entity is null.");
        const entityWithProvidedId = await this.tryToReadOne(entity.id);
        return this.repository.save({...entityWithProvidedId, ...entity} as BaseEntity as DeepPartial<T>);
    }

    async delete(id: number): Promise<T> {
        const entityWithProvidedId = await this.tryToReadOne(id);
        return this.repository.save({...entityWithProvidedId, isActive: false} as BaseEntity as DeepPartial<T>);
    }

}