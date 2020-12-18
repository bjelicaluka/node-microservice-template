import { Repository } from "typeorm";
import { ICrudService } from "../contracts/Services/ICrudService";
import { BaseEntity } from "../entity/BaseEntity";

export class CrudService implements ICrudService<BaseEntity> {
    
    protected repository: Repository<BaseEntity>;

    async get(): Promise<BaseEntity[]> {
        return this.repository.find({ loadEagerRelations: true });
    }

    async getById(id: string): Promise<BaseEntity> {
        return this.repository.findOne(id);
    }

    async add(entity: BaseEntity): Promise<BaseEntity> {
        return this.repository.save(entity);
    }

    async update(entity: BaseEntity): Promise<BaseEntity> {
        return this.repository.save(entity);
    }

    async delete(id: string): Promise<BaseEntity> {
        let entityToRemove = await this.repository.findOne(id);
        return this.repository.remove(entityToRemove);
    }

}