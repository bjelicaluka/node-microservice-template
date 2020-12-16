import {getRepository} from "typeorm";
import {User} from "../entity/User";
import { IUserService } from "../contracts/Services/IUserService";

export class UserService implements IUserService {
    
    private userRepository = getRepository(User);

    async get(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getById(id: string): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async add(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async update(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async delete(id: string): Promise<User> {
        let userToRemove = await this.userRepository.findOne(id);
        return this.userRepository.remove(userToRemove);
    }

    public static getInstance(): IUserService {
        return new UserService();
    }

}