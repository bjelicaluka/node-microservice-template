import { Entity, Column, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { TestEnum } from "./enum/TestEnum";

/**
 * Test entity
 * @typedef {object} Test
 * @property {number} id - The test id
 * @property {string} userGroupId.required - The id of the user group
 * @property {string} name.required - The test name
 * @property {number} enum.required - enum:0,1,2 - The test enumeration
 * @property {number} numValue.required - The number - double
 */
@Entity()
export class Test extends BaseEntity {

  @Column()
  userGroupId: string;

  @Column()
  enum: TestEnum;

  @Column()
  numValue: number;

  @Column()
  name: string;

}
