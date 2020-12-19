export interface ICrudService<BaseEntity> {
    get(): Promise<BaseEntity[]>;

    getById(id: number): Promise<BaseEntity>;

    add(alarmRecord: BaseEntity): Promise<BaseEntity>;

    update(alarmRecord: BaseEntity): Promise<BaseEntity>;

    delete(id: number): Promise<BaseEntity>;
};