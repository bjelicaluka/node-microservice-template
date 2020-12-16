export interface ICrudService<BaseEntity> {
    get(): Promise<BaseEntity[]>;

    getById(id: string): Promise<BaseEntity>;

    add(alarmRecord: BaseEntity): Promise<BaseEntity>;

    update(alarmRecord: BaseEntity): Promise<BaseEntity>;

    delete(id: string): Promise<BaseEntity>;
};