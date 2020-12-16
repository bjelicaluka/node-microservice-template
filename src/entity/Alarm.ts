import { Entity, Column, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { AlarmSensor } from "./AlarmSensor";
import { AlarmType } from "./AlarmType";

@Entity()
export class Alarm extends BaseEntity {

  @ManyToMany(() => AlarmSensor, alarmSensor => alarmSensor.alarms)
  alarmSensors: AlarmSensor[];

  @Column()
  alarmType: AlarmType;

  @Column()
  threshold: number;

}
