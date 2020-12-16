import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class BaseEntity {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  isActive: boolean;

}
