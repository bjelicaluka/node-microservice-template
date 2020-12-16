import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

// Migration Example
export class PostRefactoring1605806524482 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        queryRunner.insertOne("user", {firstName: "lala",
            lastName: "string",
            age: 123})
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
