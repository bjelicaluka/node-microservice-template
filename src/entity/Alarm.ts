import { Entity, Column, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { AlarmSensor } from "./AlarmSensor";
import { AlarmType } from "./enum/AlarmType";
import { AlarmPriority } from "./enum/AlarmPriority";

@Entity()
export class Alarm extends BaseEntity {

  @ManyToMany(() => AlarmSensor, alarmSensor => alarmSensor.alarms, {
    nullable: false,
  })
  alarmSensors: AlarmSensor[];

  @Column()
  alarmType: AlarmType;

  @Column()
  threshold: number;

  @Column({
    default: AlarmPriority.Low
  })
  priority: AlarmPriority;

}
