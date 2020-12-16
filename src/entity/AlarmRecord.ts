import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { AlarmSensor } from "./AlarmSensor";

@Entity()
export class AlarmRecord extends BaseEntity {

  @ManyToOne(() => AlarmSensor, alarm => alarm.alarmRecords)
  alarmSensor: AlarmSensor;

  @Column()
  criticalValue: number;

}
