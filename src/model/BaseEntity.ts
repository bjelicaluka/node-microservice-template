import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: true
  })
  isActive: boolean;

}
