export interface ICrudService<T> {
    read(): Promise<T[]>;

    readOne(id: number): Promise<T>;
    
    tryToReadOne(id: number): Promise<T>;

    add(entity: T): Promise<T>;

    update(entity: T): Promise<T>;

    delete(id: number): Promise<T>;
};