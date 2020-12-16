import { User } from "../../entity/User";

export interface IUserService {
    get(): Promise<User[]>;

    getById(id: string): Promise<User>;

    add(user: User): Promise<User>;

    update(user: User): Promise<User>;

    delete(id: string): Promise<User>;
};