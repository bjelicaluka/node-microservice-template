import { injectable } from "inversify";
import { Repository } from "typeorm";
import { ICrudService } from "../contracts/Services/ICrudService";
import { BaseEntity } from "../entity/BaseEntity";
import { EntityAlreadyExistsError } from "../error/errors/EntityAlreadyExistsError";
import { EntityNotFoundError } from "../error/errors/EntityNotFoundError";

@injectable()
export class CrudService implements ICrudService<BaseEntity> {
    
    protected repository: Repository<BaseEntity>;

    async get(): Promise<BaseEntity[]> {
        return this.repository.find({ loadEagerRelations: true });
    }

    async getById(id: number): Promise<BaseEntity> {
        const entityWithProvidedId = await this.repository.findOne(id);
        if(entityWithProvidedId)
            return entityWithProvidedId;
        throw new EntityNotFoundError("Entity with provided id does not exist.");
    }

    async add(entity: BaseEntity): Promise<BaseEntity> {
        const entityWithProvidedId = await this.repository.findOne(entity.id);
        if(!entity.id || !entityWithProvidedId)
            return this.repository.save(entity);
        throw new EntityAlreadyExistsError("Entity with provided id already exists.");
    }

    async update(entity: BaseEntity): Promise<BaseEntity> {
        const entityWithProvidedId = await this.repository.findOne(entity.id);
        if(entityWithProvidedId)
            return this.repository.save(entity);
        throw new EntityNotFoundError("Entity with provided id does not exist.");
    }

    async delete(id: number): Promise<BaseEntity> {
        const entityWithProvidedId = await this.repository.findOne(id);
        if(entityWithProvidedId)
            return this.repository.remove(entityWithProvidedId);
        throw new EntityNotFoundError("Entity with provided id does not exist.");
    }

}