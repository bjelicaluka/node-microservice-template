export interface ICrudService<T> {
    get(): Promise<T[]>;

    getById(id: number): Promise<T>;

    add(entity: T): Promise<T>;

    update(entity: T): Promise<T>;

    delete(id: number): Promise<T>;
};