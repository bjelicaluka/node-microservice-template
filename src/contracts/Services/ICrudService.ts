export interface ICrudService<BaseEntity> {
    get(): Promise<BaseEntity[]>;

    getById(id: number): Promise<BaseEntity>;

    add(entity: BaseEntity): Promise<BaseEntity>;

    update(entity: BaseEntity): Promise<BaseEntity>;

    delete(id: number): Promise<BaseEntity>;
};